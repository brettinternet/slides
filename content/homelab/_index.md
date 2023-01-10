+++
title = "homelab"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
+++

{{% section %}}

## Bare-metal servers

<img src="./bookcover.jpg" alt="server bookcover" height="300px">

## in the laundry room

{{% note %}} Nevermind the clickbait title, in my opinion the "Homelab" also
applies to cloud services that you run yourself.

It's hard to tailor this topic to a wide audience with a variety of experiences,
so I'll touch on various ideas and leave it up to you to explore the rest.

I really want what I present to be actionable instead of theoretical. This is
from the perspective of a hobbyist, instead of a professional, although I
believe the both support each other.

Working agreement: you can interrupt me as we go or even shout vulgarities if
you'd like. {{% /note %}}

---

## Poll

{{< f >}}

Who self-hosts an application _locally_?

{{< /f >}} {{< f >}}

Who self-hosts an application _in the cloud_?

{{< /f >}} {{< f >}}

Why do you do it?

{{< /f >}}

---

## Demo

{{< f >}} [https://livebook.brett.pw](https://livebook.brett.pw) {{< /f >}}

{{% /section %}}

---

{{% section %}}

## Hardware

<!-- Move this to after software? -->

<img src="./optiplex.webp" width="600" alt="dell optiplex" />

{{% note %}}From 2009 I think? Start using it in 2015. There's veteran blood in
the room with a few of you being sysadmins - **Has anyone self-hosted on _older_
hardware than this?** {{% /note %}}

---

<img src="raspberrypi.png" alt="Raspberry Pi" height="500px" />

$35

{{% note %}} Enough compute in the palm of your hand to make a desktop for
Grandma to run Facebook on. {{% /note %}}

---

{{< slide background-image="pico-cluster.jpg" >}}

---

{{< slide background-iframe="https://www.hardkernel.com" >}}

---

{{< slide background-iframe="https://www.fractal-design.com/products/cases/node/node-804/" >}}

---

{{< slide background-image="supermicro.png" >}}

---

<img src="./hba.jpg" width="600px" alt="HBA PCI card" />

- Dell Perc H310
- LSI 9211-8i IT mode (bypass hardware RAID)

{{% /section %}}

---

{{% section %}}

<!-- Software 1. VMs/Docker, 2. docker-compose, 3. kubernetes -->

## Devops

---

<img src="proxmox.png" alt="Proxmox dashboard" width="800px" />

---

```sh
APP=$(cat <<-END
while true; do
  echo -e 'HTTP/1.1 200 OK\n\n $(date)' | nc -l -p 3000
done
END
)
docker run --rm --name simple -p 3000:3000 busybox sh -c "$APP"
```

{{% note %}}

Here is out app - We're using netcat to listen to TCP connects on a port and
reply with a _very_ simple HTTP response.

<!-- Add note about what Docker is doing -->

{{% /note %}}

---

<img src="docker-compose.png" alt="yaml code" width="200px" />

[brettinternet/docker-compose-hosted-demo](https://github.com/brettinternet/docker-compose-hosted-demo)

---

{{< tweet user="dexhorthy" id="856639005462417409" >}}

---

Self-hosted K8s tooling

{{< f >}}- [metallb](https://metallb.universe.tf/): bare-metal service
LoadBalancer{{< /f >}}

{{< f >}}- [Flux](https://fluxcd.io/flux/): gitops{{< /f >}}

{{< f >}}- [sops](https://github.com/mozilla/sops): secrets in git{{< /f >}}

{{< f >}}- [reloader](https://github.com/stakater/Reloader): upgrade pod when
config/secret changes{{< /f >}}

{{< f >}}

- [system-upgrade-controller](https://github.com/rancher/system-upgrade-controller):
  planned node upgrades{{< /f >}}

{{< f >}}- [kured](https://github.com/kubereboot/kured): reboot daemon{{< /f >}}

{{< f >}}

Starting point: https://github.com/onedr0p/flux-cluster-template

[k8s@home Discord](https://k8s-at-home.com/)

{{< /f >}}

{{% /section %}}

---

{{% section %}}

<!-- There's an app for that - showcase self-hosted applications -->

{{< slide background-iframe="https://www.youtube.com/embed/szrsfeyLzyg" >}}

---

#### Some Apps

{{< f >}}- [OPNsense](https://opnsense.org/about/about-opnsense/): firewall and
router{{< /f >}}

{{< f >}}- [Document management](https://github.com/paperless-ngx/paperless-ngx)
([Demo](https://demo.paperless-ngx.com/accounts/login/?next=/)): document
archive{{< /f >}}

{{< f >}}- [Folding@home](https://foldingathome.org/diseases/?lng=en): protein
simulations{{< /f >}}

{{< f >}}- [Miniflux](https://miniflux.app/): simple RSS reader{{< /f >}}

{{< f >}}- [AdGuard Home](https://miniflux.app/) or
[Pi-hole](https://pi-hole.net/): DNS proxy
([FBI warning](https://www.ic3.gov/Media/Y2022/PSA221221?=8324278624)){{< /f >}}

{{< f >}}- [Plex](https://www.plex.tv): stream home media{{< /f >}}

{{< f >}}- [ntfy](https://ntfy.sh) ([Demo](https://ntfy.sh/app)): pubsub push
notifications{{< /f >}}

{{< f >}}- [Home Assistant](https://www.home-assistant.io)
([Demo](https://demo.home-assistant.io/)): home automation{{< /f >}}

---

### Home Assistant

{{< tweet user="grohliest" id="1025944951123861504" >}}

---

{{< slide background-image="homeassistant.png" >}}

{{% /section %}}

---

{{% section %}}

## Resources

- [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- Subreddits: [selfhosted](https://www.reddit.com/r/selfhosted/),
  [homelab](https://www.reddit.com/r/homelab/),
  [DataHoarder](https://www.reddit.com/r/DataHoarder/)
- [Privacy Guides](https://www.privacyguides.org/)
  ([PrivacyToolsIO subreddit](https://www.reddit.com/r/privacytoolsIO/))

---

## Thank you to our sponsors

<img src="austin.png" alt="Austin" width="300px" />

[The NetMan Shop](https://netmanshop.com/)

---

[Homelab pics](../homelab-pics)

{{% /section %}}
