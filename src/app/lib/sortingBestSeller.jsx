function getTopElements(arr, colors, k) {
  if (arr.length === 0) {
    return [];
  }

  if (arr.length <= k) {
    buildMinHeap(arr);
    return extractTopElements(arr, colors);
  }

  let heap = arr.slice(0, k);
  buildMinHeap(heap);

  for (let i = k; i < arr.length; i++) {
    if (arr[i].score > heap[0].score) {
      heap[0] = arr[i];
      heapify(heap, 0);
    }
  }

  const result = extractTopElements(heap, colors);
  return result;
}

function buildMinHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i);
  }
}

function heapify(arr, i) {
  const n = arr.length;
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left].score < arr[smallest].score) {
    smallest = left;
  }
  if (right < n && arr[right].score < arr[smallest].score) {
    smallest = right;
  }
  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    heapify(arr, smallest);
  }
}

function extractTopElements(heap, colors) {
  const sortedResults = [];
  while (heap.length > 1) {
    sortedResults.push(heap[0]);
    heap[0] = heap.pop();
    heapify(heap, 0);
  }
  if (heap.length > 0) {
    sortedResults.push(heap.pop());
  }

  sortedResults.reverse();
  return sortedResults.map((x) => ({
    id: colors[x.index].colorId,
  }));
}

export default getTopElements;
