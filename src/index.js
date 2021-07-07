import InputError from './errors/input-error.js';

let stockCostBuckets = [];

function addStock({ quantity, costPerItem }) {
  stockCostBuckets.push({ quantity, costPerItem });
}

function getStockDecreaseCosts(quantity) {
  quantity = Math.abs(quantity)
  let costs = [];
  if (stockCostBuckets[0].quantity > quantity) {
    stockCostBuckets[0].quantity -= quantity;
    costs.push({
      cost: stockCostBuckets[0].costPerItem,
      quantity: quantity,
    });
  } else if (stockCostBuckets[0].quantity === quantity) {
    costs.push({
      cost: stockCostBuckets[0].costPerItem,
      quantity: quantity,
    });
    stockCostBuckets.shift();
  } else {
    let remainingQuantity = quantity - stockCostBuckets[0].quantity;
    costs.push({
      cost: stockCostBuckets[0].costPerItem,
      quantity: stockCostBuckets[0].quantity,
    });
    stockCostBuckets.shift();
    let subCosts = getStockDecreaseCosts(remainingQuantity);
    costs.push(subCosts);
  }
  return costs.flat();
}

function isNumeric(n) {
  return !Number.isNaN(n) && Number.isFinite(n);
}

function isValidInput(stockMovement) {
  return isNumeric(stockMovement.quantity) &&
    isNumeric(stockMovement.costPerItem);
}

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

export default function fifoCalculator(stockSeries = []) {
  stockSeries = deepCopy(stockSeries)
  stockSeries.forEach((stockMovement) => {
    if (!isValidInput(stockMovement)) {
      throw new InputError('Invalid input', stockMovement);
    }

    if (stockMovement.quantity > 0) {
      addStock(stockMovement);
    }

    if (stockMovement.quantity < 0) {
      let costs = getStockDecreaseCosts(stockMovement.quantity);
      stockMovement.costs = costs;
      delete stockMovement.costPerItem;
    }

    stockMovement.quantityOnHand = stockCostBuckets.reduce((total, stockMovement) => total + stockMovement.quantity, 0)
  })
  return stockSeries;
}