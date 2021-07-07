import InputError from './errors/input-error.js';

let stockCostBuckets = [];

function addStock({ quantity, costPerItem }) {
  stockCostBuckets.push({ quantity, costPerItem });
}

function removeStock(quantity) {
  let costs = [];
  if (stockCostBuckets[0].quantity > quantity) {
    stockCostBuckets[0].quantity -= quantity;
    costs.push(stockCostBuckets[0].costPerItem);
  } else if (stockCostBuckets[0].quantity === quantity) {
    costs.push(stockCostBuckets[0].costPerItem);
    stockCostBuckets.shift();
  } else {
    let remainingQuantity = quantity - stockCostBuckets[0].quantity;
    costs.push(stockCostBuckets[0].costPerItem);
    stockCostBuckets.shift();
    costs.concat(removeStock(remainingQuantity));
  }

  return costs;
}

function isValidInput(stockMovement) {
  return isNumeric(stockMovement.quantity) &&
    isNumeric(stockMovement.costPerItem);
}

export default function fifoCalculator(stockSeries = []) {
  stockSeries.forEach((stockMovement) => {
    if (!isValidInput(stockMovement)) {
      throw new InputError('Invalid input', stockMovement);
    }

    if (stockMovement.quantity > 0) {
      addStock(stockMovement);
    }

    if (stockMovement.quantity < 0) {
      removeStock(stockMovement.quantity);
    }
  })
}