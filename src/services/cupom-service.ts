import { ICoupon, UsedBy } from '@/interfaces/cupom/cupom-interface';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, Timestamp, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

export const createCoupon = async (coupon: ICoupon) => {
    const couponRef = doc(db, 'coupons', coupon.code);
    await setDoc(couponRef, coupon);
};

export const getCoupons = async (): Promise<ICoupon[]> => {
    const querySnapshot = await getDocs(collection(db, 'coupons'));
    return querySnapshot.docs.map(doc => doc.data() as ICoupon);
};

export const useCoupon = async (code: string, userEmail: string) => {
    const couponRef = doc(db, 'coupons', code);
    const couponDoc = await getDoc(couponRef);

    if (!couponDoc.exists) throw new Error('Cupom não encontrado');

    const coupon = couponDoc.data() as ICoupon | undefined;

    if (!coupon) throw new Error('Cupom não encontrado ou inválido');

    if (coupon.singleUse && coupon.usedBy?.some(ub => ub.userEmail === userEmail)) {
        throw new Error('Este cupom já foi usado por este usuário.');
    }

    if (new Date(coupon.expiresAt) < new Date()) {
        throw new Error('Este cupom expirou.');
    }

    const updatedUsedBy: UsedBy[] = coupon.usedBy ? [...coupon.usedBy, { userEmail, used_at: Timestamp.now() }] : [{ userEmail, used_at: Timestamp.now() }];

    await setDoc(couponRef, {
        ...coupon,
        usedCount: coupon.usedCount + 1,
        usedBy: updatedUsedBy,
    }, { merge: true });
};

export const validateCouponCode = async (couponCode: string, userEmail: string) => {
    try {
        const couponRef = doc(db, 'coupons', couponCode);
        const couponDoc = await getDoc(couponRef);

        if (!couponDoc.exists) {
            return { isValid: false, message: 'Cupom inválido.' };
        }

       else if (!couponCode) {
            return { isValid: false, message: 'Insira o código do Cupom.' };
        }

        const coupon = couponDoc.data() as ICoupon | undefined;

        if (!coupon) throw new Error('Cupom não encontrado ou inválido');

        if (coupon.singleUse && coupon.usedBy?.some(ub => ub.userEmail === userEmail)) {
            return { isValid: false, message: 'Este cupom já foi usado ou expirado.' };
        }

        if (new Date(coupon.expiresAt) < new Date()) {
            return { isValid: false, message: 'Este cupom expirou.' };
        }

        return { isValid: true, discount: coupon.discount };
    } catch (error: any) {
        return { isValid: false, message: error.message };
    }
};

export const deleteCoupon = async (couponCode: string) => {
    const couponRef = doc(db, 'coupons', couponCode);

    await deleteDoc(couponRef);
    console.log(`Cupom ${couponCode} excluído com sucesso.`);
};