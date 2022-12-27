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

  it('it should dispatch loadWeather action when input value', (done) => {
    // it creates the spy for input element and it subscribes to it
    const observerSpy = subscribeSpyTo(component.locationForm.controls.location.valueChanges);
    // get the input element
    const input = fixture.nativeElement.querySelector('input');
    // set the value
    input.value = 'Colombia, sabaneta';
    // triggers the input event
    input.dispatchEvent(new Event('input'));
    // detect the ngzone changes that were dispatched
    fixture.detectChanges();
    // resolve the changes promise
    fixture.whenStable().then(() => {
      // assert the last value emitted by input and check it
      expect(observerSpy.getLastValue()).toEqual('Colombia, sabaneta');
      done();
    });
  })
});
