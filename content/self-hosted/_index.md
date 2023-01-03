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

---

<!-- Poll -->

### ?

{{< f >}}

#### Who self-hosts an application _locally_?

{{< /f >}} {{< f >}}

#### Who self-hosts an application _in the cloud_?

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

{{< slide background-iframe="https://www.fractal-design.com/products/cases/node/node-804/" >}}

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

{{< f >}}- [AdGuard Home](https://miniflux.app/): DNS proxy
([FBI warning](https://www.ic3.gov/Media/Y2022/PSA221221?=8324278624)){{< /f >}}

{{< f >}}- [OPNsense](https://opnsense.org/about/about-opnsense/): firewall and
router{{< /f >}}

{{< f >}}- [Plex](https://www.plex.tv): stream home media{{< /f >}}

{{< f >}}- [Home Assistant](https://www.home-assistant.io)
([Demo](https://demo.home-assistant.io/)): home automation{{< /f >}}

---

### Home Assistant

{{% /section %}}

---

## Resources

- [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- Subreddits: [selfhosted](https://www.reddit.com/r/selfhosted/),
  [homelab](https://www.reddit.com/r/homelab/),
  [DataHoarder](https://www.reddit.com/r/DataHoarder/)
- [Privacy Guides](https://www.privacyguides.org/)
  ([PrivacyToolsIO subreddit](https://www.reddit.com/r/privacytoolsIO/))
- [Homelab slideshow](../homelabs)
