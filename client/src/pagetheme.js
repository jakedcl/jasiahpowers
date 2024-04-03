export const mainButtonStyle = {
    fontSize: {
      xs: '18px', // small devices
      sm: '18px', // medium devices (tablets)
      md: '20px', // large devices (desktops)
      lg: '20px', // extra large devices (large desktops)
      xl: '20px', // extra extra large devices
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
        backgroundColor: 'rgb(213, 213, 213)',
        color: 'black',
    },
};
  
  export const cornerButtonStyle = {
    fontSize: {
      xs: '16px', // small devices
      sm: '18px', // medium devices (tablets)
      md: '20px', // large devices (desktops)
      lg: '22px', // extra large devices (large desktops)
      xl: '24px', // extra extra large devices
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
      xs: '50px', // small devices
      sm: '60x', // medium devices (tablets)
      md: '70px', // large devices (desktops)
    },
  }