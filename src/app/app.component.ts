import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoundProgressComponent } from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoundProgressComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'asm-stepper';
  progress = 45;
  currentStepIndex = 0;

  oldStep = '';
  currentStep = '';
  nextStep = '';

  fadeInClasses = ['animate__fadeInUp', 'animate__animated'];
  fadeOutClasses = ['animate__fadeOutDown', 'animate__animated'];

  oldStepInstance: HTMLElement | null = null;
  currentStepInstance: HTMLElement | null = null;
  nextStepInstance: HTMLElement | null = null;

  steps: string[] = [
    'Waiting',
    'Downloading',
    'Verify Assets',
    'Upload Screenshots',
    'Verify Upload',
  ];

  ngOnInit(): void {
    this.progress = 0;
    this.currentStepIndex = 0;

    this.updateSteps();
    this.oldStepInstance = document.getElementById('oldStep');
    this.currentStepInstance = document.getElementById('newStep');
    this.nextStepInstance = document.getElementById('nextStep');
  }

  updateSteps(): void {
    this.oldStepInstance?.classList.add(...this.fadeInClasses);
    this.currentStepInstance?.classList.add(...this.fadeInClasses);
    this.nextStepInstance?.classList.add(...this.fadeInClasses);

    this.oldStep = this.steps[this.currentStepIndex - 1] || '';
    this.currentStep = this.steps[this.currentStepIndex];
    this.nextStep = this.steps[this.currentStepIndex + 1] || '';

    // Calculate progress percentage
    this.progress = (this.currentStepIndex / (this.steps.length - 1)) * 100;
    setTimeout(() => {
      this.oldStepInstance?.classList.remove(...this.fadeInClasses);
      this.currentStepInstance?.classList.remove(...this.fadeInClasses);
      this.nextStepInstance?.classList.remove(...this.fadeInClasses);
    }, 1000);
  }

  public setNextStep(): void {
    console.log('setNextStep called', this.oldStepInstance);
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.updateSteps();
    }
  }
  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.updateSteps();
    }
  }
}
