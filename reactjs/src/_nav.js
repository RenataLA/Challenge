export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Perfil',
      url: '/personality',
      icon: 'cui-lightbulb',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Selecionar Talentos',
      url: '/personality',
      icon: 'cui-lightbulb',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Comparar',
      url: '/personality',
      icon: 'cui-lightbulb',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Gerenciar Talentos',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Cadastrar',
      url: '/cadastrarusuario',
      icon: 'cui-user-follow',
    },
    {
      name: 'Modificar',
      url: '/modify',
      icon: 'cui-lightbulb',
    },
    {
      name: 'Excluir',
      url: '/exclude',
      icon: 'cui-lightbulb',
    },
    {
      title: true,
      name: 'Gerenciar Vagas',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Cadastrar',
      url: '/registerjob',
      icon: 'cui-user-follow',
    },
    {
      name: 'Modificar',
      url: '/modify',
      icon: 'cui-lightbulb',
    },
  ],
};
