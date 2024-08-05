import { useCoupon, validateCouponCode } from "@/services/cupom-service";
import { AlertUtils } from "./alert-utils";
import { formatMoney } from "./formatToMoney";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { sendTrainingPurchaseConfirmationEmail } from '@/utils/emailService';
import { db } from '@/domain/config/firebase';
import { AddNotificationsUtils } from '@/infra/services/add-notifications-utils';
import { User } from "firebase/auth";
import { ITraining } from "@/interfaces/training/training";


interface PaymentState {
    setloading: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmited: React.Dispatch<React.SetStateAction<boolean>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setBoletoFile: React.Dispatch<React.SetStateAction<File | null>>;
    setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}


export const calculateDiscountedPrice = (discountt: number, course_price: number) => {
    if (discountt > 0 && discountt <= 100) {
        const discountedPrice = course_price * (1 - discountt / 100); // Calcula o preço com desconto
        return formatMoney(discountedPrice); // Formata o preço com desconto para exibição
    }
    return formatMoney(course_price); // Retorna o preço original formatado se não houver desconto
};

export const calculateDiscountedPriceNumber = (discountt: number, course_price: number): number => {
    if (discountt > 0 && discountt <= 100) {
        const discountedPrice = course_price * (1 - discountt / 100); // Calcula o preço com desconto
        return discountedPrice; // Formata o preço com desconto para exibição
    }
    return course_price; // Retorna o preço original formatado se não houver desconto
};




export const validateCoupon = async (couponCode: string, userEmail: string, id_course: string,
    setDiscount: React.Dispatch<React.SetStateAction<string>>): Promise<boolean> => {

    if (!couponCode) {
        AlertUtils.error('Insira o código do cupom!');
        return false
    }
    try {
        const result: any = await validateCouponCode(couponCode, userEmail);

        if (result.isValid) {
            AlertUtils.success('Cupom aplicado com sucesso!');
            sessionStorage.setItem(id_course + '_c', couponCode)
            sessionStorage.setItem(id_course + '_d', result.discount ? result.discount : '')

            setDiscount(result.discount ? result.discount : '');
            return true;
        } else {
            AlertUtils.error(result.message || 'Cupom inválido!');
            return false;
        }
    } catch (error) {
        console.error('Erro ao validar o cupom:', error);
        AlertUtils.error('Erro ao validar o cupom.');
        return false;
    }
};

export const applyCoupon = async (couponCode: string, userEmail: string): Promise<void> => {
    try {
        await useCoupon(couponCode, userEmail);
        //sessionStorage.removeItem('cupom')
    } catch (error) {
        console.error('Erro ao aplicar o cupom:', error);
        AlertUtils.error('Erro ao aplicar o cupom.');
    }
};

export const uploadFileToStorage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `comprovantes/${file.name}`);

    try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};


interface HandlePaymentConfirmParams extends PaymentState {
    id_course: string;
    currentUser: User | null;
    paymentMethod: 'cartao' | 'transfer' | '';
    statusPagamento: 'pendente' | 'aprovado';
    cardData?: { cardNumber: string; expiryDate: string; cvv: string };
    boletoFile: File | null;
    discount?: string;
    course: ITraining | null;
}

export const handlePaymentConfirm = async ({
    id_course,
    currentUser,
    paymentMethod,
    statusPagamento,
    cardData,
    boletoFile,
    discount,
    course,
    setloading,
    setSubmited,
    setFile,
    setBoletoFile,
    setShowPaymentModal,
}: HandlePaymentConfirmParams): Promise<void> => {
    try {
        const userDocRef = doc(db, 'admins', currentUser!.uid);
        const userCoursesRef = doc(userDocRef, 'courses', id_course);

        let paymentDetails: any = {
            courseId: id_course,
            purchaseDate: Timestamp.now(),
            course_name: course?.title,
            price: discount ? calculateDiscountedPriceNumber(parseInt(discount), course?.price ? course?.price : 0) : course?.price,
            progresso: 0,
            statusPagamento,
        };

        if (paymentMethod === 'cartao') {
            paymentDetails = {
                ...paymentDetails,
                method: 'cartao',
                cardData,
            };
        } else if (paymentMethod === 'transfer' && boletoFile) {
            const boletoDownloadURL = await uploadFileToStorage(boletoFile);
            paymentDetails = {
                ...paymentDetails,
                method: 'transferencia/deposito',
                boletoFile: boletoDownloadURL,
            };
        } else {
            throw new Error('Método de pagamento inválido ou dados insuficientes.');
        }

        await setDoc(userCoursesRef, paymentDetails);

        await AddNotificationsUtils({
            user_id: currentUser!.uid,
            student_email: currentUser!.email || '',
            user_name: currentUser!.displayName || '',
            title: 'Compra de treinamento',
            content: `${discount && 'Cupom aplicado, desconto de ' + discount + '%'} Sua compra do Treinamento ${course?.title} foi realizada com sucesso.`,
        });

        await sendTrainingPurchaseConfirmationEmail(
            currentUser!.email || '',
            currentUser!.displayName || '',
            `${course?.title} ${discount && 'Cupom aplicado, desconto de ' + discount + '%'} `,
            discount ? calculateDiscountedPriceNumber(parseInt(discount), course?.price ? course?.price : 0) : course?.price ? course?.price : 0
        );

        // Limpar os estados após a conclusão do pagamento
        setloading(false);
        setSubmited(true);
        setFile(null);
        setBoletoFile(null);

        // Fechar o modal após a compra
        setShowPaymentModal(false);

        sessionStorage.removeItem(id_course + '_d')
        sessionStorage.removeItem(id_course + '_c')
        AlertUtils.success('Sua compra deste treinamento foi submetido com sucesso e aguarda aprovação.')

    } catch (error) {
        setloading(false);
        console.error('Erro ao confirmar pagamento:', error);
        AlertUtils.error('Erro ao confirmar pagamento. Por favor, tente novamente mais tarde.');
        throw error; // Propagar o erro para quem chamou a função lidar com ele
    }
};