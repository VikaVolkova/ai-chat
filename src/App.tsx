import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

function App() {
  const [response, setResponse] = useState<string>(
    'Hi there! How can I assist you?'
  );
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:3005/chatbot', {
      question: value,
    });
    setResponse(response.data);
  };

  return (
    <Box
      sx={{ padding: 2, maxWidth: 1200, margin: 'auto', textAlign: 'center' }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          label="Enter something"
          variant="outlined"
          fullWidth
          value={value}
          onChange={onChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Answer: {response}
      </Typography>
    </Box>
  );
}

export default App;
