class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.size = 0;
    }

    hash(key) {
        let hash = 0;

        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return hash % this.buckets.length;
    }

    set(key, value) {
        const index = this.hash(key);

        if(this.buckets[index]) {
            for(let i = 0; i < this.buckets[index].length; i++) {
                if(this.buckets[index][i][0] === key) {
                    this.buckets[index][i][1] = value;

                    return;
                }
            }

            this.buckets[index].push([key, value]);
        } else {
            this.buckets[index] = [];
            this.buckets[index].push([key, value]);
        }

        this.size++;
    }

    get(key) {
        const index = this.hash(key);

        if(this.buckets[index]) {
            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[index][i] && this.buckets[index][i][0] === key) {
                    return this.buckets[index][i][1];
                }
            }
        }

        return undefined;
    }

    has(key) {
        if(this.get(key)) {
            return true;
        } else {
            return false;
        }
    }

    remove(key) {
        const index = this.hash(key);

        if(this.buckets[index] && this.buckets[index].length) {
            for(let i = 0; i < this.buckets.length; i++) {
                if(this.buckets[index][i][0] === key) {
                    this.buckets[index].splice(i, 1);
                    this.size--;

                    return true;
                }
            }
        } else {
            return false;
        }
    }

    length() {
        let bucketSize = 0;

        this.buckets.forEach((bucket) => {
            if(bucket.length !== 0) {
                bucketSize++;
            }
        });

        return bucketSize;
    }

    clear() {
        this.buckets.fill(null);
    }

    keys() {
        let storedKeys = [];

        this.buckets.forEach((bucket) => {
            if(bucket.length !== 0) {
                storedKeys.push(bucket[0][0]);
            }
        });

        return storedKeys;
    }

    values() {
        let storedValues = [];

        this.buckets.forEach((bucket) => {
            if(bucket.length !== 0) {
                storedValues.push(bucket[0][1]);
            }
        });

        return storedValues;
    }

    entries() {
        let storedEntries = [];

        this.buckets.forEach((bucket) => {
            if(bucket.length !== 0) {
                storedEntries.push(bucket[0]);
            }
        });

        return storedEntries;
    }
}

const hashMap = new HashMap();
hashMap.set("one", "Edo");
hashMap.set(2, "Samael");
hashMap.set("three", "Duriel");

console.log(hashMap.get("one"));
console.log(hashMap.get(2));
console.log(hashMap.get("three"));

hashMap.remove(2);
console.log(hashMap.get(2));
console.log(hashMap.has("one"));

console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
