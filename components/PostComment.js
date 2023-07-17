import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function PostComment(){
    return(
        <>
            <div>
                <Box
                    width={{
                        xs: '90%', // 画面幅がxs（スマートフォン）の場合
                        sm: '90%', // 画面幅がsm（タブレット）の場合
                        md: '90%', // 画面幅がmd（デスクトップ）の場合
                        lg: '90%', // 画面幅がlg（大きなデスクトップ）の場合
                        xl: '90%', // 画面幅がxl（非常に大きなデスクトップ）の場合
                    }}
                    maxWidth={500}
                >
                    <Stack>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">星</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="1" />
                                    <FormControlLabel value="2" control={<Radio />} label="2" />
                                    <FormControlLabel value="3" control={<Radio />} label="3" />
                                    <FormControlLabel value="4" control={<Radio />} label="4" />
                                    <FormControlLabel value="5" control={<Radio />} label="5" />
                                </RadioGroup>
                        </FormControl>
                        <TextField
                            id="outlined-multiline-static"
                            label="コメント"
                            multiline
                            rows={4}
                        />
                        <Button variant="contained">投稿</Button>
                    </Stack>
                </Box>
            </div>   
        </>
    );
}

export default PostComment;