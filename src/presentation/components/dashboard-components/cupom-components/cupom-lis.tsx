import { ICoupon, UsedBy } from '@/interfaces/cupom/cupom-interface';
import { getCoupons, deleteCoupon } from '@/services/cupom-service'; // Importe a função de deleteCoupon
import React, { useEffect, useState } from 'react';

export const CouponList: React.FC = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const fetchedCoupons = await getCoupons();
      setCoupons(fetchedCoupons);
    };
    fetchCoupons();
  }, []);

  const formatUsedByList = (usedBy: UsedBy[] | undefined) => {
    if (!usedBy || usedBy.length === 0) return 'Nenhum usuário utilizou este cupom.';
    return usedBy.map(ub => ub.userEmail).join(', ');
  };

  const handleDeleteCoupon = async (couponCode: string) => {
    try {
      await deleteCoupon(couponCode); // Chame sua função de deleteCoupon com o código do cupom
      const updatedCoupons = await getCoupons(); // Atualize a lista de cupons após a remoção
      setCoupons(updatedCoupons);
    } catch (error) {
      console.error('Erro ao excluir o cupom:', error);
    }
  };

  if (coupons.length <= 0) {
    return 'Carregando cupons...';
  }

  return (
    <div className=" ">
      <ul className='grid grid-cols-2 gap-4'>
        {coupons.map(coupon => (
          <li key={coupon.code} className='my-1 bg-white py-6 px-6'>
            {coupon.code} - {coupon.discount}% - Válido até: {coupon.expiresAt}
            <br />
            {coupon.singleUse && `Uso único - Usado ${coupon.usedCount} vez(es)`}
            <br />
            <hr />
            Usuários que utilizaram este cupom: {formatUsedByList(coupon.usedBy)}
            <br />
            <button onClick={() => handleDeleteCoupon(coupon.code)} className="bg-red-500 text-white px-4 py-2 mt-2">Remover Cupom</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
    </div>
  );
};
