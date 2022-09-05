import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { WeatherState } from '@store/weather/weather.reducer';
import { LocationComponent } from './location.component';


describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let store: MockStore;
  const initialState: WeatherState = {
    location: '',
    temp: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should dispatch loadWeather action with input value', (done) => {
    const observerSpy = subscribeSpyTo(component.locationForm.controls.location.valueChanges);
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Colombia, sabaneta';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(observerSpy.getLastValue()).toEqual('Colombia, sabaneta');
      done();
    });
  })
});
