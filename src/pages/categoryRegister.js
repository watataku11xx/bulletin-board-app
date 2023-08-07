import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const categoryRegister = () => {

    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch('/api/prisma/prismaCategoryRegister', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('フォームの送信に成功しました！');
        } else {
            console.error('フォームの送信に失敗しました。');
        }
        } catch (error) {
        console.error('エラーが発生しました:', error);
        }
    };

    return(
        <>
        <h2>カテゴリーの登録</h2>
                <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    カテゴリー名:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">登録</button>
                </form>
        </>
    )
}

export default categoryRegister;