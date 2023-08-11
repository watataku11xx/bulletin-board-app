import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import NotLoginPage from '@components/NotLoginPage';

const toolRegister = ({ categories} ) => {

    //セッションのEmailで投稿者を決定
  // sessionには、以下のような値が入っています。
  // {
  //     "user":{
  //        "name":"John",
  //        "email":"john@examle.com",
  //        "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
  //     },
  //     "expires":"2023-04-01T00:29:51.016Z"
  // }

  const { data: session } = useSession();
    
  const [formData, setFormData] = useState({
    toolName: '',
    toolOverView: '',
    sessionEmail: '',
    selectedCategories: [],
  });

  //useEffectを使用して、sessionが入力された後にセットする。
  useEffect(() => {
      if (session) {
      setFormData((prevFormData) => ({
          ...prevFormData,
          sessionEmail: session.user.email, // セッションがある場合はメールアドレスをセット
      }));
      }
  }, [session]);

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
      const response = await fetch('/api/prisma/prismaToolRegister', {
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

  const handleCheckboxChange = (category) => {
    const updatedSelectedCategories = formData.selectedCategories.includes(category)
      ? formData.selectedCategories.filter((cat) => cat !== category)
      : [...formData.selectedCategories, category];

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCategories: updatedSelectedCategories,
    }));
  };

  return (
    <>
        <h2>ツールの登録</h2>
        {
            session && (
                <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    ツール名:
                    <input type="text" name="toolName" value={formData.name} onChange={handleChange} required/>
                  </label>
                </div>
                <div>
                  <label>
                    ツール概要:
                    <textarea name="toolOverView" value={formData.message} onChange={handleChange} required/>
                  </label>
                </div>
                <div>
                  {
                    categories.map(
                      (category) => (
                        <label key={category.category_id}>
                          <input
                            type="checkbox"
                            value={category.category_id}
                            checked={formData.selectedCategories.includes(category.category_id)}
                            onChange={() => handleCheckboxChange(category.category_id)}
                          />
                          {category.categoryname}
                        </label>
                      )
                    )
                  }
                </div>
                <button type="submit">登録</button>
                </form>
            )
        }
        {
            // セッションがない場合、ログインを表示
            // ログインボタンを押すと、ログインページに遷移する
            !session && (
                <NotLoginPage />
            )
        }
    </>
  );
};

export default toolRegister;


export async function getServerSideProps(){
  const res = await fetch(`http://localhost:3000/api/prisma/prismaCategoryDisplay`);
  const data = await res.json();
  return{
    props: {
      categories : data,
    },
  };
}