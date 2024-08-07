import { ICoupon } from '@/interfaces/cupom/cupom-interface';
import { createCoupon } from '@/services/cupom-service';
import React, { useState } from 'react';
import { CouponList } from './cupom-lis';
import { Button } from '../../button/button';

export const CouponForm = () => {
    const [coupon, setCoupon] = useState<ICoupon>({
        code: '',
        discount: 0,
        expiresAt: '',
        singleUse: false,
        usedCount: 0,
        usedBy: [], // Lista de emails dos usuários que utilizaram o cupom
    });

    const [criados, setCriados] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCoupon(prevCoupon => ({
            ...prevCoupon,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCoupon(coupon);
            alert('Cupom criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar cupom:', error);
        }
    };

    return (
        <div className=' '>
            {
                !criados ?

                    <>
                        <br />
                        <br />
                        <div className="flex justify-between">
                            <h2 className='text-4xl font-bold hacker '>Ver Cupons</h2>
                            <Button onClick={() => setCriados(!criados)} text='Ver Cupons' color='primary' />
                        </div>

                        <form onSubmit={handleSubmit} className=' w-6/12  text-start justify-start pt-6 flex flex-col gap-6'>
                            <input className='input_card' name="code" value={coupon.code} onChange={handleChange} placeholder="Código do cupom" required />
                            <label htmlFor="">Desconto (%)</label>
                            <input className='input_card' name="discount" value={coupon.discount} onChange={handleChange} placeholder="Desconto (%)" type="number" required />
                            <input
                                className='input_card'
                                name="expiresAt"
                                type="date"
                                value={coupon.expiresAt}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]} // Definindo a data mínima como o dia atual
                                required
                            />  <label>
                                <input name="singleUse" className='me-4' checked={coupon.singleUse} onChange={handleChange} type="checkbox" />
                                Uso único
                            </label>
                            <div>

                                <Button type="submit" text='Criar Cupom' color='primary' />
                            </div>
                        </form>

                        <br />
                    </>
                    :
                    <>
                        <br />
                        <div className="flex justify-between">
                            <h2 className='text-4xl hacker font-bold  '>Cupons Criados </h2>

                            <Button onClick={() => setCriados(!criados)} text='Criar Cupom' color='primary' />
                        </div>
                        <br />
                        <CouponList />
                    </>

            }

        </div>
    );
};
