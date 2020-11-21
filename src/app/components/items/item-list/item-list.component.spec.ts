import { HttpClientModule } from '@angular/common/http';
import { render, RenderResult } from '@testing-library/angular';
import { ItemComponent } from '../item/item.component';
import { ItemListComponent } from './item-list.component';

let comp: RenderResult<ItemListComponent>;

const setup = async () => {
  return await render(ItemListComponent, {
    declarations: [ItemComponent],
    imports: [HttpClientModule],
  });
};
describe('ItemListComponent', () => {
  beforeEach(async () => {
    comp = await setup();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
