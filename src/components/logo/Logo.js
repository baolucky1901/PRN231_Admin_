import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import { Grid, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
       <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 407 511.76"><path fill-rule="nonzero" d="M12.91 194.05C5.96 194.05 0 188.09 0 180.8c0-6.96 5.96-12.91 12.91-12.91h35.11c11.92.33 22.52 2.64 31.46 8.28 9.94 6.29 17.22 15.89 21.19 30.13 0 .34 0 .66.34 1l3.31 13.24h289.77c7.28 0 12.91 5.97 12.91 12.91 0 1.33-.34 2.66-.66 3.98l-33.78 123.99c-1.33 5.95-6.62 9.94-12.59 9.94H148.03c4.64 17.22 9.27 26.48 15.57 30.79 7.61 4.97 20.86 5.3 43.05 4.97h150.01c7.28 0 12.91 5.96 12.91 12.91 0 7.29-5.95 12.92-12.91 12.92H206.97c-27.48.32-44.37-.34-57.94-9.28-13.92-9.27-21.2-25.16-28.49-53.98L76.17 213.92c0-.34 0-.34-.33-.66-1.99-7.3-5.3-12.26-9.94-14.9-4.63-2.99-10.93-4.31-18.21-4.31H12.91zm100.85-84.43L221.6 1.77c2.36-2.36 6.24-2.36 8.62.01l122.82 122.8c3.17 3.58-1.1 8-5.98 12.49l-62.09 62.08h-58.98l-80.61-80.61c-1.55-1.54-4.37-1.26-6.27.64l-3.72 3.75c-1.92 1.91-2.22 4.72-.67 6.26l69.96 69.96h-46.14l-44.77-44.79c-12.32-12.3-12.32-32.45-.01-44.74zm218.39 89.53 38.49-38.51-12.53-12.54 9.22-9.23 15.95 15.96c2.9 2.91 2.9 7.66 0 10.58l-33.74 33.74h-17.39zm-47.68 74.52c0-4.08 4.04-7.39 9.01-7.39 4.98 0 9.01 3.31 9.01 7.39v37.83c0 4.08-4.03 7.39-9.01 7.39-4.97 0-9.01-3.31-9.01-7.39v-37.83zm-53.94 0c0-4.08 4.03-7.39 9-7.39 4.98 0 9.01 3.31 9.01 7.39v37.83c0 4.08-4.03 7.39-9.01 7.39-4.97 0-9-3.31-9-7.39v-37.83zm-53.95 0c0-4.08 4.04-7.39 9.02-7.39 4.97 0 9 3.31 9 7.39v37.83c0 4.08-4.03 7.39-9 7.39-4.98 0-9.02-3.31-9.02-7.39v-37.83zm141.34 174.51c17.55 0 31.78 14.24 31.78 31.79 0 17.56-14.23 31.79-31.78 31.79-17.56 0-31.8-14.23-31.8-31.79 0-17.55 14.24-31.79 31.8-31.79zm-139.42 0c17.54 0 31.78 14.24 31.78 31.79 0 17.56-14.24 31.79-31.78 31.79-17.56 0-31.8-14.23-31.8-31.79 0-17.55 14.24-31.79 31.8-31.79zm-66.9-201.81 29.47 98.82h208.97l27.49-98.82H111.6z"/></svg>
       
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="./app" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
      <span>
        <Typography variant="h4" sx={{ mb: 5 }}>
          J4F-ITBook
        </Typography>
      </span>
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
