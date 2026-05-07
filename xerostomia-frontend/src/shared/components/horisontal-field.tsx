import { Stack, SxProps, Typography, Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

export function HorizontalField({
  label,
  value,
  sx,
  bottomDivider = false,
}: {
  label: string;
  value?: ReactNode | string | number | null;
  sx?: SxProps;
  bottomDivider?: boolean;
}) {
  return (
    <Stack direction="column" sx={{ width: '100%' }} spacing={1}>
      <Stack
        sx={{ flex: 1, px: 1, width: '100%', ...sx }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" sx={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>
          {label}
        </Typography>
        <Box>
          {typeof value === 'string' ||
          typeof value === 'number' ||
          value === null ||
          value === undefined ? (
            <Typography variant="body1">{value ?? 'N/A'}</Typography>
          ) : (
            value
          )}
        </Box>
      </Stack>
      {bottomDivider && <Divider sx={{ width: '100%' }} />}
    </Stack>
  );
}
