+++
title = "Self-hosted"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
plugins = ["plugins/chalkboard.js"]
+++

## Bare-metal servers

<img src="./bookcover.jpg" alt="server bookcover" height="300px">

## in the laundry room

---

## Simple

{{% section %}}

{{% /section %}}

---

{{< tweet user="SanDiegoZoo" id="1453110110599868418" >}}

---

{{< slide class="overflow-auto" >}}

{{< gist brettinternet 8b7e0a5ad0d335f55fc6483c5a10bb14 >}}

---

```python{3|6}
n = 0
while n < 10:
  if n % 2 == 0:
    print(f"{n} is even")
  else:
    print(f"{n} is odd")
  n += 1
```

---

[Homelab slideshow](../homelabs)
