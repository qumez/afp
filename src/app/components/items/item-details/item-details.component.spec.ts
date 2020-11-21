import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { render, RenderResult } from '@testing-library/angular';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { MaterialTestingModule } from 'src/app/testing/material-testing.module';
import { mockItem } from 'src/app/testing/testing-models';
import { ItemDetailsComponent } from './item-details.component';

let comp: RenderResult<ItemDetailsComponent>;
const setup = async () => {
  return await render(ItemDetailsComponent, {
    imports: [MaterialTestingModule, HttpClientModule],
    declarations: [SafeHtmlPipe],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: mockItem }],
  });
};
describe('ItemDetailsComponent', () => {
  beforeEach(async () => {
    comp = await setup();
  });
  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
