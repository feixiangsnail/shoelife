const getMenu = menuLists => {
  const lists = menuLists && menuLists.map(menu => {
      const childrenList = menu.childrenList && menu.childrenList.map(idx => {
          return {
            title: idx.title,
            url: idx.url,
          }
        })
      return {
        title: menu.title,
        icon: menu.icon,
        children: childrenList || []
      };
    }) || [];

  return lists;
}

export default getMenu;









