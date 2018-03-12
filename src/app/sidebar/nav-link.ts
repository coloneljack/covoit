export class NavLink {
  constructor(
    private _routerLink: string = '',
    private _label: string = '',
    private _icon: string = '',
    private _selected: boolean = false
  ) {}

  get routerLink(): string {
    return this._routerLink;
  }

  get label(): string {
    return this._label;
  }

  get icon(): string {
    return this._icon;
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(s: boolean) {
    this._selected = s;
  }
}
