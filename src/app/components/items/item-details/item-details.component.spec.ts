import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { render, RenderResult } from '@testing-library/angular';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { MaterialTestingModule } from 'src/app/testing/material-testing.module';
import { ItemDetailsComponent } from './item-details.component';

let comp: RenderResult<ItemDetailsComponent>;
const setup = async () => {
  return await render(ItemDetailsComponent, {
    imports: [MaterialTestingModule],
    declarations: [SafeHtmlPipe],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
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
