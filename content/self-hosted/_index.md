+++
title = "Self-hosted"
outputs = ["Reveal"]
[reveal_hugo]
history = true
center = true
plugins = ["plugins/chalkboard.js"]
+++

{{% section %}}

## Bare-metal servers

<img src="./bookcover.jpg" alt="server bookcover" height="300px">

## in the laundry room

{{% note %}} Nevermind the clickbait title, in my opinion the "Homelab" also
applies to cloud services that you run yourself. {{% /note %}}

---

<!-- Poll -->

### Resources & Questions

[https://go.gardiner.cloud/mural](https://app.mural.co/t/pdq3587/m/pdq3587/1672788287090/6eb4baca62fcbe958507dab73b33f88a28279404?sender=a8ff14a1-7a4c-4610-9ecf-4c2add6f713f)

{{< f >}}

#### Who self-hosts an application _locally_?

{{< /f >}} {{< f >}}

#### Who self-hosts an application _in the cloud_?

{{< /f >}} {{< f >}}

#### Why is this relevant?

{{< /f >}}

---

<!-- About -->

### Hardware

<!-- Move this to after software? -->

<img src="./optiplex.webp" width="600" alt="dell optiplex" />

{{% note %}}From 2009 I think? Start using it in 2015. There's veteran blood in
the room with a few of you being sysadmins - **Has anyone self-hosted on _older_
hardware than this?** {{% /note %}}

---

{{< slide background-image="" >}}

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

<!-- Software 1. Simple, 2. Good, 3. Bad -->

### Simple Example

{{< f >}}

```sh
APP=$(cat <<-END
while true; do
  echo -e 'HTTP/1.1 200 OK\n\n $(date)' | nc -l -p 3000
done
END
)
docker run --rm --name simple -p 3000:3000 busybox sh -c "$APP"
```

{{< /f >}}

{{% note %}}

Here is out app - We're using netcat to listen to TCP connects on a port and
reply with a _very_ simple HTTP response.

<!-- Add note about what Docker is doing -->

{{% /note %}}

{{% /section %}}

---

{{% section %}}

## Good Example

{{% /section %}}

{{% section %}}

## Bad Example

{{< tweet user="dexhorthy" id="856639005462417409" >}}

{{% /section %}}

{{% section %}}

<!-- There's an app for that - showcase self-hosted applications -->

{{< slide background-iframe="https://www.youtube.com/embed/szrsfeyLzyg" >}}

---

#### Some Apps

{{< f >}}- [Document management](https://github.com/paperless-ngx/paperless-ngx)
([Demo](https://demo.paperless-ngx.com/accounts/login/?next=/)): document
archive{{< /f >}}

{{< f >}}- [Miniflux](https://miniflux.app/): simple RSS reader{{< /f >}}

{{< f >}}- [AdGuard Home](https://miniflux.app/) or
[Pi-hole](https://pi-hole.net/): DNS proxy
([FBI warning](https://www.ic3.gov/Media/Y2022/PSA221221?=8324278624)){{< /f >}}

{{< f >}}- [OPNsense](https://opnsense.org/about/about-opnsense/): firewall and
router{{< /f >}}

{{< f >}}- [Plex](https://www.plex.tv): stream home media{{< /f >}}

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
- [Homelab slideshow](../homelabs)
- [PDQ Homelab Mural](https://go.gardiner.cloud/mural)

---

## Thank you to our sponsors

<img src="austin.png" alt="Austin" width="300px" />

[The NetMan Shop](https://netmanshop.com/)

{{% /section %}}
