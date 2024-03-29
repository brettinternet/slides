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

{{% note %}} Nevermind the clickbait title - bare metal just sounded sexy.

Wide audience - experience, interests, etc Touch on various ideas and leave it
up to you to explore the rest.

Goal is to give you something actionable instead of completely theoretical (if
this interests you).

Hobby, but a place to _prototype_ (creativity that Kyle and Dan have suggested
is so crucial to success), learn, break things or see what happens {{% /note %}}

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

{{% note %}} I want to _connect_ you with this demo at this address.
{{% /note %}}

{{% /section %}}

---

{{% section %}}

## Hardware

<!-- Move this to after software? -->

<img src="optiplex.webp" width="500" alt="dell optiplex" />

{{% note %}}From 2009 I think? Start using it in 2015. There's veteran blood in
the room with a few of you being sysadmins - **Has anyone self-hosted on _older_
hardware than this?** {{% /note %}}

---

<img src="raspberrypi.png" alt="Raspberry Pi" height="500px" />

<s>$35</s>

{{% note %}} Enough compute in the palm of your hand to make a desktop for
Grandma to run Facebook on.

Does anyone use a different ARM device in their homelab? {{% /note %}}

---

{{< slide background-image="pico-cluster.jpg" >}}

---

{{< slide background-iframe="https://www.hardkernel.com" >}}

---

{{< slide background-iframe="https://www.fractal-design.com/products/cases/node/node-804/" >}}

{{% note %}} Good for when you live in an apartment. {{% /note %}}

---

{{< slide background-image="supermicro.png" >}}

---

<img src="hba.jpg" width="600px" alt="HBA PCI card" />

- Dell Perc H310
- LSI 9211-8i IT mode (bypass hardware RAID)

{{% note %}} Another hardware you want to shoutout? NUC {{% /note %}}

{{% /section %}}

---

{{% section %}}

<!-- Software 1. VMs/Docker, 2. docker-compose, 3. kubernetes -->

## Devops

---

<img src="proxmox.png" alt="Proxmox dashboard" width="800px" />

{{% note %}} Spinning up multiple VMs per app is becoming sort of old fashioned
because it consumes resources unnecessarily. There are lots of legitmate reasons
to use a VM when other virtualization methods aren't available. {{% /note %}}

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

{{% note %}} The screenshot here shows you the manifest you'd need to self-host
our Livebook app here.

No port forwarding, HTTPS

_This is simple, secure and pretty damn quick!_

There's a reverse proxy, cloudflare tunnel (only traffic from cloudflare),
automatic DNS record updates, and then our app with a directory on my laptop
mounted as a volume.

1. Review docker-compose
1. Review repo devops
1. Review architecture with diagram in Livebook {{% /note %}}

---

{{< tweet user="dexhorthy" id="856639005462417409" >}}

---

### Self-hosted K8s tooling

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

{{% note %}} Teaser - now check out the starter template.

- Installs k3s with Ansible and sets up DNS with Terraform
- Installs Flux and reconciles the cluster with the git repo's kustomize and
  helm definitions
- Cert-manager will manage your Let's Encrypt certs {{% /note %}}

---

{{% section %}}

<!-- There's an app for that - showcase self-hosted applications -->

{{< slide background-iframe="https://www.youtube.com/embed/szrsfeyLzyg" >}}

---

#### There's an app for that

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

{{% note %}} What's stopping you from having relationships like this?
{{% /note %}}

---

{{< slide background-image="homeassistant.png" >}}

{{% /section %}}

---

## Resources

- [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- Subreddits: [selfhosted](https://www.reddit.com/r/selfhosted/),
  [homelab](https://www.reddit.com/r/homelab/),
  [DataHoarder](https://www.reddit.com/r/DataHoarder/)
- [Privacy Guides](https://www.privacyguides.org/)
  ([PrivacyToolsIO subreddit](https://www.reddit.com/r/privacytoolsIO/))

{{% note %}} What did I miss? What resources or tips do you want your peers to
know about self-hosting or setting up a homelab to prototype and play with
ideas. {{% /note %}}
