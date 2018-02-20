import { CovoitPage } from './app.po';

describe('covoit App', () => {
  let page: CovoitPage;

  beforeEach(() => {
    page = new CovoitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
