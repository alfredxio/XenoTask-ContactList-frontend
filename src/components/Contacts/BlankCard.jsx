import React from "react";
import "./card.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const BlankCard = React.memo(() => {
  return (
    <>
    <div className="wrapper">
    <Stack spacing={3}>
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
    </div>
    </>
  );
});

export default BlankCard;
