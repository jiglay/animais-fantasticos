import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);

    // ['touchstart', 'click'] são argumentos padrão de events
    if (events === undefined) this.events = ['touchstart', 'click'];
    else this.events = events;
  }

  // ativa o dropdownmenu e adiciona a função que observa o click fora dele
  activeDropdownMenu(event) {
    event.preventDefault();

    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdownmenu
  addDropdownMenuEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }
  
  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenuEvent();
    }
    return this;
  }
}
