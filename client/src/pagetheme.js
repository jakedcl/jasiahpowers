export const mainButtonStyle = {
  fontSize: {
    xs: '1.2rem', // small devices
    sm: '1.2rem', // medium devices (tablets)
    md: '1.4rem', // large devices (desktops)
    lg: '1.4rem', // extra large devices (large desktops)
    xl: '1.5rem', // extra extra large devices
  },
  color: 'black',
  backgroundColor: 'rgb(243,232,232)',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  display: 'inline-block',
  px: '1.2vh',
  py: '.5vh',
  my: '.5vh',
  '&:hover' : {
    backgroundColor: 'rgb(229, 213, 213)',
    color: 'black',
  },
};
  
  export const cornerButtonStyle = {
    fontSize: {
      xs: '1rem', // small devices
      sm: '1.125rem', // medium devices (tablets)
      md: '1.25rem', // large devices (desktops)
      lg: '1.375rem', // extra large devices (large desktops)
      xl: '1.5rem', // extra extra large devices
    },
    color: 'black',
    backgroundColor: 'rgb(244, 241, 236)',
    border: '1px solid rgb(243,232,232)',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'inline-block',
    px: '.5vh',
    my: '.5vh',
    '&:hover' : {
        backgroundColor: 'rgb(213, 213, 213)',
        color: 'black',
    },
  };
  
  export const titleStyle = {
    fontSize: {
      xs: '4.375rem', // small devices
      sm: '4.375rem', // medium devices (tablets)
      md: '5rem', // large devices (desktops)
    },
  }