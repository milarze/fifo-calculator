import fifoCalculator from '../src/index.js';
import InputError from '../src/errors/input-error.js';

const inputArray = [
  {
    "quantity": 1.0,
    "costPerItem": 10.0,
  },
  {
    "quantity": -1.0,
    "costPerItem": 0.0,
  },
  {
    "quantity": 10.0,
    "costPerItem": 5.0,
  },
  {
    "quantity": 10.0,
    "costPerItem": 6.0,
  },
  {
    "quantity": 5.0,
    "costPerItem": 7.0,
  },
  {
    "quantity": -23.0,
    "costPerItem": 0.0,
  },
  {
    "quantity": 100.0,
    "costPerItem": 8.0,
  },
  {
    "quantity": -10.0,
    "costPerItem": 0.0,
  },
  {
    "quantity": -20.0,
    "costPerItem": 0.0,
  },
  {
    "quantity": -10.0,
    "costPerItem": 0.0,
  },
];

const invalidInput = [
  {
    test: -1
  },
];

test('fifoCalculator returns the movements hydrated with sell costs', () => {
  expect(fifoCalculator(inputArray)).toStrictEqual([
    {
      "quantity": 1.0,
      "costPerItem": 10.0,
      "quantityOnHand": 1.0,
      "valueOnHand": 10.0,
    },
    {
      "quantity": -1.0,
      "quantityOnHand": 0.0,
      "valueOnHand": 0.0,
      "costs": [
        {
          "cost": 10.0,
          "quantity": 1.0
        },
      ],
    },
    {
      "quantity": 10.0,
      "costPerItem": 5.0,
      "quantityOnHand": 10.0,
      "valueOnHand": 50.0,
    },
    {
      "quantity": 10.0,
      "costPerItem": 6.0,
      "quantityOnHand": 20.0,
      "valueOnHand": 110.0,
    },
    {
      "quantity": 5.0,
      "costPerItem": 7.0,
      "quantityOnHand": 25.0,
      "valueOnHand": 145.0,
    },
    {
      "quantity": -23.0,
      "quantityOnHand": 2.0,
      "valueOnHand": 14.0,
      "costs": [
        {
          "cost": 5.0,
          "quantity": 10.0
        },
        {
          "cost": 6.0,
          "quantity": 10.0
        },
        {
          "cost": 7.0,
          "quantity": 3.0
        }
      ]
    },
    {
      "quantity": 100.0,
      "costPerItem": 8.0,
      "quantityOnHand": 102.0,
      "valueOnHand": 814.0,
    },
    {
      "quantity": -10.0,
      "quantityOnHand": 92.0,
      "valueOnHand": 736.0,
      "costs": [
        {
          "cost": 7.0,
          "quantity": 2.0
        },
        {
          "cost": 8.0,
          "quantity": 8.0
        },
      ],
    },
    {
      "quantity": -20.0,
      "quantityOnHand": 72.0,
      "valueOnHand": 576.0,
      "costs": [
        {
          "cost": 8.0,
          "quantity": 20.0
        },
      ],
    },
    {
      "quantity": -10.0,
      "quantityOnHand": 62.0,
      "valueOnHand": 496.0,
      "costs": [
        {
          "cost": 8.0,
          "quantity": 10.0
        },
      ],
    },
  ]);
});

test('throws InputError with invalid input', () => {
  expect(() => fifoCalculator(invalidInput)).toThrowError(new InputError('Invalid input', {
    test: -1
  }));
});