import React from "react";
import styled from "styled-components";
import { Box } from "../components/atoms/StyledSystem";
import DocumentView from "../components/molecules/DocumentView";

const Container = styled(Box)`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 10px 40px 0 40px;
  }
`

const CommunityGuidelines = () => {
  return (
    <Container>
      <DocumentView
        document={{
          title: 'Community Guidelines',
          lastUpdate: 'Updated on 2nd December 2021',
          description: (
            <p>
              We want to build a community that empowers creators and collectors alike. Creating a new system of support
              for digital art requires mutual respect between creators, collectors, and curators. We hope you can embody
              these ideals and help us work towards building a welcoming community.
            </p>
          ),
        }}
        contentList={contentList}
      />
    </Container>
  )
}

const contentList = [
  {
    title: 'For the community',
    scrollId: '1',
    renderContent: () => {
      return (
        <div>
          <p>
            Bandit Discord and Telegram is a community of artists and collectors who share their work and learn from
            each other in shared online spaces like Instagram and Twitter. To break from the old and start something
            truly new, we must be led by values of kindness and inclusivity. Anyone who is interested in joining our
            community on a deeper level is welcome to become a member of the Bandit NFT team at Discord and Telegram.
          </p>
        </div>
      )
    },
  },
  {
    title: 'For Creators',
    scrollId: '2',
    renderContent: () => {
      return (
        <div>
          <p>
            We want to support the creators community and provide them with a platform to reach a larger target
            audience. We believe in providing full freedom for creators to truly express themselves, and understand the
            effort that goes behind making each piece. Hence, trust and support for our creators community is of utmost
            importance to us.
          </p>
          <p>
            However, content or behavior that jeopardizes our users, threatens our infrastructure, or damages our
            community is removed including the following :
          </p>
          <ul>
            <li>
              <b>Copyright or trademark infringement</b>- You cannot upload anyone else’s copyright or otherwise
              proprietary work
            </li>
            <li>
              You can’t create additional NFTs that represent the same piece. However, related works in a series are
              acceptable
            </li>
            <li>
              <b>Shoddy quality work</b>- We want to maintain a good quality of artwork and encourage you to evaluate
              the work before publishing it
            </li>
            <li>
              <b>Pornography and sexually explicit material</b> - Promotion or glorification of self-harm is prohibited.
            </li>
            <li>
              <b>Violence, mutilation, and gore depiction</b> - Anything illegal such as fraud, phishing, inciting
              violence, or anything else that's against the law.
            </li>
            <li>
              <b>AI Generative Art</b> - Usage of 3rd party apps to create text prompt driven images is not allowed.
              Instead, a traditional approach is encouraged.
            </li>
          </ul>
          <p>
            Please note you maintain all legal rights, including copyrights and trademarks of your original work. You
            can reproduce, distribute, exhibit, and make derivative work of your piece on Bandit NFT Marketplace.
          </p>
        </div>
      )
    },
  },
  {
    title: 'For the collectors',
    scrollId: '3',
    renderContent: () => {
      return (
        <div>
          <p>
            Artists in the NFT space are ushering in new cultural paradigms and models for arts patronage through their
            forward-thinking approaches. When collectors collect an NFT, they receive a unique NFT from an artist they
            want to support and champion.
          </p>
          <p>
            As a collector you own the NFT that represents the artwork on the blockchain. You can display and share the
            piece, and resell/ trade it on a secondary market.
          </p>
          <p>
            However, you cannot claim legal ownership, copyrights, trademarks, or other intellectual property rights as
            a collector unless specifically mentioned by the Creator.
          </p>
        </div>
      )
    },
  },
  {
    title: 'Creating a safe place for the community',
    scrollId: '4',
    renderContent: () => {
      return (
        <div>
          <ul>
            <li>We all have a responsibility to create a positive environment.</li>
            <li>
              We encourage our collectors and creators to not cause harm, steal, spam or be hateful. We highly encourage
              transparency
            </li>
            <li>
              If you see any of these behaviors on the Bandit NFT Marketplace, let us know via reporting and reaching us
              on our{' '}
              <a href="#" target="_blank" style={{ color: '#000000' }}>
                <b>support page</b>
              </a>
              .
            </li>
            <li>
              If we determine a creator is doing any of these things, we will mediate the situation which may include
              account suspension and in severe cases blacklisting of the creator or collector account.
            </li>
          </ul>
        </div>
      )
    },
  },
  {
    title: 'Fair use policy',
    scrollId: '5',
    renderContent: () => {
      return (
        <div>
          <p>
            Fair use is the transformation of a copyrighted work for purposes such as art, commentary, criticism and
            education or parody. One example would be using an audio recording in memes online with their permission but
            only if it's not played at full volume so there could also include transformative uses like turning those
            same clips into music videos which are still called "fair use".
          </p>
          <p>
            As an artist, it is important to consider the legal implications of creating NFTs. This includes questions
            like:
          </p>

          <ul>
            <li>Are you the owner of all assets used in your work?</li>
            <li>
              Do you add meaning or expression to the original work by using the copyrighted work? If not, how does your
              use of the copyrighted work affect the value of the owners of the original work?
            </li>
            <li>
              Did you obtain permission from the original creator to create an NFT based on an existing IP? For eg.
              Bored Apes, Crypto Punks etc.
            </li>
            <li>When you modify an existing NFT, do you own the original NFT?</li>
          </ul>
          <p>
            If you're looking to repurpose the content of others, it's important that your use be factored into their
            original intent. Otherwise there may still exist infringement claims against your creation because they
            would consider what was done in violation regardless if permission has been granted or not by copyright
            holders themselves - this includes any disclaimer language such as "all rights belong," which only addresses
            one aspect but does nothing for clarity on where materials come from specifically so long-term consequences
            could arise when dealing with future litigation down the line.
          </p>
          <h6>
            The Bandit NFT report committee can remove any work that violates another party's intellectual property
            rights.
          </h6>
        </div>
      )
    },
  },
]

export default CommunityGuidelines
