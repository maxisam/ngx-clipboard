import { ClidemoPage } from './app.po';

describe('clidemo App', function() {
  let page: ClidemoPage;

  beforeEach(() => {
    page = new ClidemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
