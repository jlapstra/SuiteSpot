# Assignment Instructions

The SuitePortal is a resident portal for residents of a building to submit maintenance requests for their unit.

There will be two types of users of this web app: residents and admins.

The residents should be able to access the maintenance request forms without any sort of login or account.

The admins should be required to login before viewing a list of open maintenace requests. From there they should be able to close any of the open requests.

A maintenance request should have these at least these fields:

```
export interface MaintenanceRequest {
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
}
```

## Requirements:

1. Admin users should be able to go to the `/admin` page and login to a special admin account
2. Resident users should not need an account to submit the maintenance request form
3. The maintenance request form should have fields to set all the properties of the MaintenanceRequest interface. The form should submit to `POST /api/maintenance-requests`
4. [lowdb](https://github.com/typicode/lowdb) is used by the API server as a simple file system database
5. The request form should be implemented using [Angular's Reactive Forms](https://angular.io/guide/reactive-forms)
6. Add a new API endpoint for Admin's to `GET /api/maintenance-requests` to return a list of open maintenance requests
7. Add a new API endpoint for Admin's to `PUT /api/maintenance-requests/:id/close` to close a specified issue with an `id`

Bonus Requirements:
1. Unit tests
2. E2E automated tests using Cypress/Protractor/WebDriver/Selenium

## 3rd-party dependencies

We do not discourage the use of 3rd-party dependencies, although if you decide to add any dependencies please provide a written reasoning for:
1. Why you needed this package
2. Why you chose this specific package

## Use what you know

We have provided this Angular/NESTJS starter project intended to give you a good head start.

Although, we are looking to see you at your best - as such, please use the languages and frameworks you are most comfortable with. So if you would feel more comfortable developing this app using React or VueJS, please do not feel pressure to use Angular.

## Show us your strengths

As you’re working on this project, focus your time and energy on your areas of expertise. If you’re a really great architect, focus on that. If you’re really great at building UI, focus on that. We want to see what you’re best at.

## Do not burn out

This project is intended to take roughtly 5 hours of your time. Please do not burn out while working on this project.
