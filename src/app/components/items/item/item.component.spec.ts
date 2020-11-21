import { HttpClientModule } from '@angular/common/http';
import { render, RenderResult } from '@testing-library/angular';
import { MaterialTestingModule } from 'src/app/testing/material-testing.module';
import { mockItem } from 'src/app/testing/testing-models';
import { ItemComponent } from './item.component';
const setup = async () => {
  return await render(ItemComponent, {
    imports: [HttpClientModule, MaterialTestingModule],
    componentProperties: {
      item: mockItem,
    },
  });
};
fdescribe('ItemComponent', () => {
  let comp: RenderResult<ItemComponent>;

  beforeEach(async () => {
    comp = await setup();
    comp.fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
