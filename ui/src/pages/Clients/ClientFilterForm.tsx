import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { css } from '@emotion/css'
import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import ClientModal from "./ClientModal";
import { useClientContextValue } from './ClientContext';

export default function ClientFilterForm() {
  const { actions, state } = useClientContextValue();

  const {
    register,
    handleSubmit,
    watch
  } = useForm();

  const handleSearch = (values: any) => {
    actions?.setSearch(values?.search);
  }

  useEffect(() => {
    watch(() => handleSubmit(handleSearch)())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, watch])

  return (
    <>
      <ClientModal open={state?.openModal!} onClose={() => actions?.setOpenModal(false)} />
      <div className={css`
            display: flex;
            justify-content: space-between;
        `}>
        <form onSubmit={handleSubmit(handleSearch)} >
          <TextField
            {...register('search')}
            id="outlined-basic"
            placeholder='Search clients...'
            size="small"
            InputProps={{
              endAdornment: <SearchIcon style={{ color: '#e4e5e7' }} />
            }}
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e5e7',
              borderRadius: '5px',
            }}
          />
        </form>
        <Button
          variant="contained"
          onClick={() => actions?.setOpenModal(true)}
          sx={{
            backgroundColor: '#345FFF',
            textTransform: 'none'
          }}>
          Create new client
        </Button>
      </div>
    </>
  )
}