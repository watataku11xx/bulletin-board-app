import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { TextField, Button, FormControl, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const PostComment = ({propValue}) => {
  const [formData, setFormData] = useState({
    value: '', 
    comment: '',
    post_id: propValue,
    sessionEmail: '',
  });

  //ボタン機能の追加
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: session } = useSession();
  
  
  //useEffectを使用して、sessionが入力された後にセットする。
  useEffect(() => {
      if (session) {
      setFormData((prevFormData) => ({
          ...prevFormData,
          sessionEmail: session.user.email, // セッションがある場合はメールアドレスをセット
      }));
      }
  }, [session]);

  const [errors, setErrors] = useState({
    value: false,
    comment: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // エラーをリセット
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

    const handleChangeRadio = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, value }));
        // エラーをリセット
        setErrors((prevErrors) => ({ ...prevErrors, value: false }));
    };

  const handleSubmit = async (e) => {

    // バリデーション（ここでは必須フィールドが空でないかをチェック）
    const newErrors = {
      value: formData.value === '',
      comment: formData.comment === '',
    };

    setErrors(newErrors);

    // エラーがなければサーバーサイドへのデータ送信のロジックを実行
    if (!Object.values(newErrors).some(Boolean)) {
      // サーバーサイドへのデータ送信のロジックをここに実装
      try {
        const response = await fetch('/api/prisma/prismaCommentRegister', {
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
    }

  };
  
  //リロード機能の追加
  const router = useRouter();

  const handleReload = () => {
      router.reload();
  };

  const handelMuitipleClicks = () => {
    handleReload();
    handleSubmit();
  }

  return (
    <>
      <Box sx={{
        position: 'fixed',
        bottom: '3%',
        right: '3%',
      }}>
        <Button variant="contained" onClick={handleClickOpen} startIcon={<AddCircleOutlineIcon/>}>
          コメント追加
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>コメント追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            誹謗中傷等は控え、節度を持ったコメントを追加してください。
          </DialogContentText>
          <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">評価</FormLabel>
                  <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formData.value} // ここでRadioボタンの選択値を設定
                  onChange={handleChangeRadio} // ここでRadioボタンの変更イベントを処理
                  >
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="4" control={<Radio />} label="4" />
                  <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
          </FormControl>

          <FormControl fullWidth error={errors.comment}>
            <TextField
              label="コメント"
              name="comment"
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={formData.comment}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            {errors.comment && <FormHelperText>コメントを入力してください</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type="submit" variant="contained" color="primary" onClick={handelMuitipleClicks}>
            送信
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostComment;