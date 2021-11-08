import { NextPage } from "next";
import Script from "next/script";

const DocsPage: NextPage= () => {
    return (
        <div>
            <p>Hey all, just thought I&apos;d right out a quick privacy policy for YBot. If you have any questions make sure to ask in the <a href="https://ybotdiscord.tech/support">support</a> server!</p>
<p><em>I am not a lawyer, just a bot developer. Please don&apos;t take me to court.</em></p>
<h2>Non optional data collection</h2>
<p>YBot by design tries to collect as little data as possible on your server, however because of the way its designed, some things are needed to ensure the best experience.</p>
<ul>
<li>YBot stores your server&apos;s unique id</li>
<li>YBot will report any errors it encounters from your server privately to its developers (Currently only me, n i c k#1990)</li>
<li>YBot will <strong>internally</strong> store all channels, your servers unique identifier, and up to 200 messages per channel. <strong>NONE</strong> of this data is accessible to me nor is it stored outside of memory. (This is done so YBot can have the ability to log message edits and deletes to those that choose to enable it. )</li>
</ul>
<p><em>However, none of these messages ever make it outside of memory and I cannot view them at any time.</em></p>
<h2 id="optional-data-collection">Optional Data Collection</h2>
<ul>
<li>If you choose to enable message editing, deleting, member joining, or member leaving features, YBot will store the channel you&apos;ve dedicated to the event &amp; report these events to your designated channel. However, these messages are never sent off site or stored locally.</li>
<li>If you choose to enable case moderation, all cases will be stored inside my database to enable users to edit and delete cases at their leisure. This will store identifiable information about the target user, moderator, action, reason, and any extra data relevant to the case (How long the mute is for example.)</li>
</ul>
<p><em>Identifiable information includes the members tag, id, and avatar at the time of mute.</em></p>
<ul>
<li>If you enable message statistics, only the ids (<code>396383058749554688</code>) from each user along with their message count is stored.</li>
</ul>
<p>Woo... we love privacy policies don&apos;t we? Anyways, that&apos;s it folks.</p>
<p><em>Written by n i c k#1990, feel free to contact via discord over in the <a href="https://ybotdiscord.tech/support">support</a> server.</em></p>

        </div>
    )
}

export default DocsPage;