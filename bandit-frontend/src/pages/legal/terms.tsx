import React from "react";
import styled from "styled-components";
import { Box } from "../../components/atoms/StyledSystem";
import DocumentView from "../../components/molecules/DocumentView";

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

const Terms = () => {
  return (
    <Container>
      <DocumentView
        document={{
          title: 'Terms and Conditions',
          lastUpdate: 'Updated on 11th February 2022',
          description: (
            <p>
              The bandit.network Platform (“<b>bandit.network Platform</b>”) allows you to create, display, buy and sell
              non-fungible tokens (“
              <b>NFTs</b>”).
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
    title: 'Introduction',
    scrollId: '1',
    renderContent: () => {
      return (
        <div>
          <p>
            By clicking the “connect” button, completing the account registration process and using the bandit.network
            Platform, you confirm that you understand and agree to these terms and conditions, together with any
            documents that may be expressly referred to and are incorporated by reference (“Terms”).
          </p>
          <p>
            These Terms constitute a legal agreement between you and bandit.network and govern your access to and use of
            the bandit.network Platform, including any content, functionality, and services offered on or through nft.
          </p>
          <p>
            bandit.network (the “Site”). bandit.network reserves the right to change or modify these terms at any time
            and at our sole discretion. You agree and understand that by accessing or using the bandit.network Platform
            and the Site following any change to these Terms, you are regarded as having agreed to the revised Terms.
          </p>
        </div>
      )
    },
  },
  {
    title: 'Definitions',
    scrollId: '2',
    renderContent: () => {
      return (
        <div>
          <p> In these Terms:</p>
          <p>
            “Applicable Law” means any law, rule, statute, subordinate legislation, regulation, by-law order, ordinance,
            protocol, code, guideline, treaty, policy, notice, direction or judicial, arbitral, administrative,
            ministerial or departmental judgment, award, decree, treaty, directive, or other requirement or guideline
            published or in force at any time which applies to or is otherwise intended to govern or regulate any person
            (including all parties to this Terms), property, transaction, activity, event or other matter, including any
            rule, order, judgment, directive or other requirement or guideline issued by any governmental or regulatory
            authority;
          </p>
          <p> “Sale Item” means any one or more of the following without limitation:</p>
          <ul>
            <li>
              Any art (including without limitation, designs, drawings, prints, images in any form or media, including
              without limitation videos and photographs);
            </li>
            <li>Audio files;</li>
            <li>Collectibles;</li>
            <li>Memorabilia;</li>
            <li>Game assets.</li>
          </ul>
          "we/us/our" means bandit.network; "you/your" means the user of the bandit.network Platform and includes
          creators, collectors, buyers and anyone who has the legitimate possession of the NFT;
        </div>
      )
    },
  },
  {
    title: 'Eligibility',
    scrollId: '3',
    renderContent: () => (
      <div>
        <p>
          bandit.network has sole and absolute discretion to allow or disallow your access to the bandit.network
          Platform.
        </p>
        <p>By agreeing to these Terms, you represent and warrant that:</p>
        <ul>
          <li>You are at least 18 years of age.</li>
          <li>You have the full right, power, and authority to agree to these Terms.</li>
          <li>
            You are not subject to any financial sanctions, embargoes or other restrictive measures imposed by the
            United Nations, European Union, any EU country, UK Treasury or US Office of Foreign Assets Control (OFAC),
            or any governmental authority in any jurisdiction in which the bandit.network Platform is available.
          </li>
          <li>
            You are not a citizen or resident of any of the following countries:
            <ol>
              <li>Belarus</li>
              <li>Burma (Myanmar)</li>
              <li>Central African Republic</li>
              <li>Cote d’Ivoire (Ivory Coast)</li>
              <li>Cuba</li>
              <li>Democratic Republic of the Congo</li>
              <li>Iran</li>
              <li>Iraq</li>
              <li>Lebanon</li>
              <li>Liberia (former Liberian Regime of Charles Taylor)</li>
              <li>Libya</li>
              <li>North Korea</li>
              <li>Somalia</li>
              <li>Sudan</li>
              <li>Syria</li>
              <li>Zimbabwe</li>
            </ol>
          </li>
          <li>You are not impersonating any other person,</li>
          <li>
            You will not use the bandit.network Platform if any Applicable Laws in your country prohibit you from doing
            so in accordance with these Terms.
          </li>
          <li>You are compliant with all Applicable Laws to which you are subject.</li>
          <li>You have read, understood and agreed to our Privacy Notice and Cookie Policy.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'bandit.network Platform Account',
    scrollId: '4',
    renderContent: () => (
      <p>
        You must create an account (“Account”) to use the bandit.network Platform. To create an account, we will require
        you to provide certain information about yourself and we may, in our sole discretion, require you to provide
        further information and/or documents at any stage during your use of the bandit.network Platform. We may, in our
        sole discretion, refuse, decline, suspend or disable your access or use of the bandit.network Platform.
      </p>
    ),
  },
  {
    title: 'Changes to the bandit.network Platform',
    scrollId: '5',
    renderContent: () => (
      <p>
        We may in our absolute and sole discretion change, update, amend, remove, or discontinue any part of the Site,
        the services and the Content at any time without prior notice to you.
      </p>
    ),
  },
  {
    title: 'Fees',
    scrollId: '6',
    renderContent: () => (
      <p>
        By buying and selling NFTs, including through the Auction process, on the bandit.network Platform, you agree to
        pay all applicable fees as stipulated in the FAQ and on the checkout screen at the time of your purchase. You
        authorize bandit.network to automatically deduct fees directly from payments to you and/ or add fees to your
        payments to bandit.network where applicable
      </p>
    ),
  },
  {
    title: 'Your Use of the bandit.network Platform and Conduct',
    scrollId: '7',
    renderContent: () => (
      <div>
        <p>
          We hereby grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site
          and Content. Our grant of such license is subject to the following conditions. You undertake not to (and shall
          not, knowingly or otherwise, authorize, allow or assist any other party to):
        </p>
        <ul>
          <li>
            Use the bandit.network Platform, Site, or your Account to conduct electronic spamming or otherwise
            distribute any unsolicited or unauthorized advertising, promotional or marketing material, junk or chain
            messages
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account to perform unlawful activities that violates any
            Applicable Laws (including but not limited to money laundering, terrorism financing and/or fraudulent
            activities) or immoral activities.
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account to engage in any activity which operates to defraud
            bandit.network, other users, or any other person, or to provide any false, inaccurate, or misleading
            information to bandit.network.
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account to upload content that is pornographic in nature ,
            hurt religious sentiments , constitutes hate speech, is immoral or illegal, contains or is infected with
            viruses, malicious codes, Trojan horses or any other harmful or deleterious program.
          </li>
          <li>
            Modify or adapt the whole or any part of the bandit.network Platform and Site or incorporate the Site into
            any other programme or application.
          </li>
          <li>
            Disassemble, decompile, reverse-engineer or otherwise attempt to derive the source code, object code,
            underlying concepts, ideas and algorithms of the Site or any components thereof.
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account in any manner that would lead to infringement of our,
            our Affiliates’ or any third party’s intellectual property rights, including without limitation any
            copyright, patent or trademark. You undertake not to take or attempt to take any action or claim ownership
            of any property that infringes or would infringe upon our intellectual property interests.
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account in a way that could damage, disable, impair or
            compromise the Site or the provision of the bandit.network Platform or interfere with other users or affect
            the reputation of bandit.network.
          </li>
          <li>
            To take any action to gain or attempt to gain unauthorized access to the account or wallets of other users.
          </li>

          <li>
            Take any action that imposes an unreasonable or disproportionately large burden or load on the
            bandit.network infrastructure (including, but without limitation to our servers, networks, data centres and
            related or like equipment) and detrimentally interfere with, intercept or expropriate any system, data or
            information belonging to other users of the bandit.network Platform.
          </li>
          <li>
            Engage in any other activities deemed inappropriate by us or which is in contravention of these Terms or any
            Applicable Laws.
          </li>
          <li>
            Provide false, inaccurate, incomplete or misleading information to bandit.network or any of its Affiliates
            or third party services providers; and/or
          </li>
          <li>
            Use the bandit.network Platform, Site, or your Account to engage in any lottery, bidding fee auctions,
            contests, sweepstakes, or other games of chance.
          </li>
          <li>
            Use of bandit.network Platform, Site, or your Account to buy and sell creator invites in return for fiat
            money or cryptocurrency is forbidden. Bandit NFT may terminate your account if it becomes aware that you are
            buying or selling invites.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'User Content',
    scrollId: '8',
    renderContent: () => (
      <div>
        <p>
          The bandit.network Platform allows (i) users to create a profile where they can post information about
          themselves, display their NFTs, and sell NFTs they own (ii) artists or creators of NFTs (<b>“Users”</b>) to
          put their NFTs up for sale (which may be via auction (<b>“Auction</b>”, please refer to clause 9 for more
          information) (together the <b>“Auction</b>).
        </p>
        <p>
          Any information you post on the Site as a User will be considered exclusive to bandit.network till the time it
          remains listed and non-confidential. By providing any User Content on the Site, you grant us and our
          affiliates and our respective licensees, successors, and assigns the right to use, reproduce, modify, perform,
          display, distribute, retransmit, publish, broadcast, and otherwise disclose to third parties any such material
          for any purpose. You represent and warrant that (1) you own and control all rights in and to your User Content
          and have the right to grant such licenses to us and our affiliates and our respective licensees, successors,
          and assigns; and (2) all of your User Content do and will comply with these Terms.
        </p>
        <p>
          You understand and agree that you are responsible for any User Content you submit or contribute, and you, and
          not bandit.network, have full responsibility for such content, including its legality, reliability, accuracy,
          and appropriateness. We are not responsible or liable to any third party for the content, accuracy, or
          appropriateness of any User Content posted by you or any other user on the Site.
        </p>
        <p>
          If you are a Creator, you hereby grant bandit.network the right to use your name and image for marketing or
          promotional purposes and agree that we may use or modify images from the NFTs that you create for marketing or
          promotional purposes. You also agree that we can use your biography and other public information about you to
          promote the NFTs that you create.
        </p>
        <p>
          If you are a Creator, you agree that you will not infringe on the intellectual property of others and will not
          coordinate pricing of any NFTs with other Creators.
        </p>
        <p>
          We reserve the right, in our absolute sole discretion, to prohibit you from uploading any NFTs to the Site. We
          are not required to monitor any User Content, but we may in our sole discretion, remove any User Content at
          any time and for any reason without notice. bandit.network may monitor the User Content to detect and prevent
          fraudulent activity or violation of these Terms.
        </p>
      </div>
    ),
  },
  {
    title: 'Sale by Auction',
    scrollId: '9',
    renderContent: () => (
      <div>
        <p>
          You may sell and purchase NFTs through the Auction process. Your participation in the Auction is subject to
          the rules available on the bandit.network Platform FAQ.
        </p>
        <p>
          You may only participate in the Auction by linking your digital wallet, which must be a type supported by
          bandit.network, to your Account.
        </p>
        <p>
          bandit.network may pause, cancel, or discontinue your Auction transactions at its sole discretion without
          liability.
        </p>
      </div>
    ),
  },
  {
    title: 'Our intellectual Property Rights',
    scrollId: '10',
    renderContent: () => (
      <div>
        <p>
          Unless otherwise indicated by us, and except to the extent of the User Content, the Site, all content, and
          other materials contained therein, including, without limitation, the bandit.network logo, and all designs,
          text graphics, pictures, information, data, software, and files relating to the bandit.network Platform (the
          “Content”) are the proprietary property of bandit.network or our affiliates, licensors, or users, as
          applicable.
        </p>
        <p>
          The bandit.network logo and any bandit.network Platform product or service names, logos, or slogans that may
          appear on the Site or elsewhere are the proprietary property of bandit.network and may not be copied, imitated
          or used, in whole or in part, without our prior written permission.
        </p>
        <p>Unless otherwise stated, you may not use any Content without our express written permission.</p>
        <p>
          We reserve the right to suspend or terminate any Account that has actually or allegedly infringed upon any
          person’s intellectual property rights.
        </p>
      </div>
    ),
  },
  {
    title: 'Your Ownership of the NFT',
    scrollId: '11',
    renderContent: () => (
      <div>
        <p>
          Apart from the Content, all other copyrights, trademarks, product names, and logos on the Site relating to and
          including the NFTs and User Content, are the property of their respective owners and may not be copied,
          imitated, or used, in whole or in part, without the permission of the applicable intellectual property right
          owner.
        </p>
        <p>
          When you buy an NFT on the bandit.network Platform, you own the NFT and have the right to sell or give away
          the NFT. If the NFT is associated with a Sale Item, you will have a worldwide, perpetual, exclusive,
          transferable, licence to use, copy, and display the Sale Item for your NFT, for so long as you own the NFT,
          solely for the following purposes: (a) for your own personal, non-commercial use; (b) as part of the
          bandit.network Platform that permits the purchase, sale and display of your NFT; (c) as part of a third party
          website or application that permits the inclusion, involvement, storage, or participation of your NFT.
        </p>
        <p>
          Without limiting the foregoing, if you believe that third-party material hosted by the bandit.network Platform
          infringes your copyright or trademark rights, please file a notice of infringement by contacting:{' '}
          <a href="mailto:legal@bandit.network" style={{ color: 'black' }}>
            <b>legal@bandit.network</b>
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    title: 'Data Protection / Privacy',
    scrollId: '12',
    renderContent: () => (
      <div>
        <p>
          By using the bandit.network Platform, you confirm that you have read and understood our Privacy Notice and
          understand how we collect, use, disclose and share amongst ourselves your Personal Data and disclose such
          Personal Data to our authorised service providers and relevant third parties. We will only share your Personal
          Data in order to facilitate and administer your use of the bandit.network Platform or otherwise if required by
          law. Such data controller will manage and protect your personal data in accordance with all applicable data
          protection laws. For full and comprehensive information about when and why we collect personal information
          about you, how we use it, the conditions under which we may disclose it and how we keep it secure, please
          refer to our Privacy Notice, which is accessible at{' '}
          <a href="https://bandit.network/legal/privacy" target="_blank" style={{ color: '#000000' }}>
            <b>https://bandit.network/legal/privacy</b>
          </a>
        </p>
        <p>
          We reserve the right at any time to satisfy our internal requirement as to your Personal Data (for example, by
          requesting relevant original documents) including for the purposes of preventing fraud and/or anti-money
          laundering and counter-terrorist financing purposes.
        </p>
      </div>
    ),
  },
  {
    title: 'Limitation of Services / Termination / Account Closure',
    scrollId: '13',
    renderContent: () => (
      <div>
        <p>
          We reserve the right, without notice and in our sole discretion, to terminate or suspend your access to or use
          of the Site and any Content and/or close your Account, at any time for any reason but in particular, if we
          suspect in our sole discretion that (i) your Account is being used for illegal activity; (ii) you have
          concealed or provided false information; (iii) you have engaged in fraudulent activity; and/or (iv) you have
          engaged in activity in violation of these Terms.
        </p>
        <p>
          If bandit.network is holding funds in your Account and has no record of your use of the bandit.network
          Platform for several years, we may be required, upon passage of applicable time periods, to report these funds
          as unclaimed property in accordance with the abandoned property and escheat laws. If this occurs, we will use
          reasonable efforts to give you written notice. If you fail to respond within seven business days or the period
          as required by Applicable Law, we may be required to deliver any such funds to the applicable jurisdiction as
          unclaimed property. We reserve the right to deduct a reasonable administrative fee from such unclaimed funds,
          as permitted by Applicable Law.
        </p>
      </div>
    ),
  },
  {
    title: 'Risks',
    scrollId: '14',
    renderContent: () => (
      <div>
        <p>
          You understand and agree that your access and use of the bandit.network Platform is subject to certain risks
          including without limitation:
        </p>
        <ul>
          <li>
            Price and liquidity of blockchain assets, including the NFTs, are extremely volatile and may be subject to
            fluctuations;
          </li>
          <li>Fluctuations in the price of other digital assets could materially and adversely affect the NFTs;</li>
          <li>
            Legislative and regulatory changes or actions may adversely affect the use, transfer, and value of the NFTs;
          </li>
          <li>NFTs are not legal tender and are not backed by any government;</li>
          <li>
            Transactions involving NFTs may be irreversible, and losses due to fraudulent or accidental transactions may
            not be recoverable;
          </li>
          <li>
            The value of NFTs may be derived from the continued willingness of market participants to exchange fiat
            currency or digital assets for NFTs, and therefore the value of NFTs is subject to the potential for
            permanent or total loss of value should the market for NFTs disappear;
          </li>
          <li>
            NFTs are subject to the risk of fraud, counterfeiting, cyber attacks and other technological difficulties
            which may prevent access to or use of your NFTs.
          </li>
        </ul>
        <p>
          You understand and agree that you are solely responsible for determining the nature, potential value,
          suitability and appropriateness of these risks for yourself. bandit.network does not give any advice or
          recommendations regarding the NFTs. You understand and agree that you access and use the bandit.network
          Platform at your own risk. You understand and agree that bandit.network will not be responsible for any
          communication failures, disruptions, errors, or distortions you may experience when using the NFTs or the
          bandit.network Platform.
        </p>
      </div>
    ),
  },
  {
    title: 'Taxes',
    scrollId: '15',
    renderContent: () => (
      <p>
        You agree that you are solely responsible for determining what, if any, taxes apply to your NFT transactions on
        the NFT bandit.network Platform. Neither bandit.network nor any other bandit.network Party is responsible for
        determining the taxes that may apply to your NFT transactions.
      </p>
    ),
  },
  {
    title: 'Disclaimers',
    scrollId: '16',
    renderContent: () => (
      <div>
        <p>
          Users may engage in promotion of their respective User Content, including without limitation their Sale Item,
          through various communications channels such as their social media accounts. bandit.network is not responsible
          for any such communications and/or promotional activities carried out by the Users and will not be liable to
          you in relation to any such communications and/or promotional activities.
        </p>
        <p>
          You bear full responsibility for verifying the identity, legitimacy, and authenticity of assets you purchase
          on bandit.network Platform. Notwithstanding indicators and messages that suggest verification, bandit.network
          makes no claims about the identity, legitimacy, or authenticity of assets on the bandit.network Platform.
        </p>
        <p>
          Except as expressly provided to the contrary in writing by bandit.network, the Site, content contained
          therein, and the NFTs listed therein are provided on an “as is” and “as available” basis without warranties or
          conditions of any kind, either express or implied. bandit.network (and its suppliers) make no warranty that
          the Site will (1) meet your requirements; (2) be available on an uninterrupted, timely, secure, or error-free
          basis; or (3) be accurate, reliable, complete, legal, or safe.
        </p>
        <p>
          bandit.network will not be liable for any loss of any kind from any action taken or taken in reliance on
          material or information contained on the Site. bandit.network does not represent or warrant that any content
          on the Site is accurate, complete, reliable, current or error-free.
        </p>
        <p>
          While bandit.network attempts to make your access to and use of the Site and content safe, bandit.network does
          not represent or warrant that the Site, content, any NFTs listed on the Site or any other part of the Site or
          bandit.network Platform are free of viruses or other harmful components. We cannot guarantee the security of
          any data that you disclose online. You acknowledge and accept the inherent security risks of providing
          information and dealing online over the Internet. We will not be responsible for any breach of security unless
          it is due to our gross negligence.
        </p>
        <p>
          We will not be responsible or liable to you for any loss and take no responsibility for, and will not be
          liable to you for, any use of the NFTs including but not limited to, any losses, damages, or claims arising
          from: (1) user error such as if you forget your password(s), incorrect transactions, or mistyped addresses;
          (2) server failure or data loss; (3) corrupted wallet files; (4) loss of NFTs.
        </p>

        <p>
          <b>
            TO THE FULLEST EXTENT PROVIDED BY LAW, bandit.network HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
            EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO THE SITE AND CONTENT CONTAINED THEREIN.
            THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
          </b>
        </p>
      </div>
    ),
  },
  {
    title: 'Limitation of Liability',
    scrollId: '17',
    renderContent: () => (
      <div>
        <p>
          <b>
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL bandit.network BE LIABLE TO YOU OR ANY THIRD PARTY
            FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES
            ARISING FROM THESE TERMS, THE SITE, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS, OR FOR ANY DAMAGES RELATED
            TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL,
            OR LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN
            IF FORESEEABLE AND EVEN IF bandit.network HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO,
            AND USE OF THE SITE, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS ARE AT YOUR OWN DISCRETION AND RISK, AND YOU
            WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA RESULTING THEREFROM.
            NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY
            OF bandit.network ARISING OUT OF OR IN ANY WAY RELATED TO THESE TERMS, THE ACCESS AND USE OF THE SITE,
            CONTENT NFTS OR ANY PRODUCT OR SERVICES PURCHASES ON THE SITE EXCEED US$100. THE FOREGOING LIMITATIONS OF
            LIABILITY SHALL NOT APPLY TO LIABILITY OF bandit.network FOR PERSONAL INJURY CAUSED BY bandit.network’S
            NEGLIGENCE OR ANY INJURY CAUSED BY bandit.network’S FRAUD OR FRAUDULENT MISREPRESENTATION.
          </b>
        </p>
      </div>
    ),
  },
  {
    title: 'Indemnification',
    scrollId: '18',
    renderContent: () => (
      <div>
        <p>
          To the fullest extent permitted by Applicable Law, you agree to indemnify, defend and hold harmless
          bandit.network and our past, present and future employees, officers, directors, contractors, consultants,
          equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents,
          representatives, predecessors, successors and assigns (individually and collectively the “bandit.network
          Parties”), from and against all actual or alleged third party claims, damages, awards, judgments, losses,
          liabilities, obligations, penalties, interest, fees, expenses (including, without limitation, court costs,
          costs of settlement and costs of pursuing indemnification and insurance), of every kind and nature whatsoever,
          whether known or unknown, foreseen or unforeseen, matured or unmatured, or suspected or unsuspected, in law or
          equity, whether in tort, contract or otherwise (collectively, “Claims”), including, but not limited to,
          damages to property or personal injury, that are caused by, arise out of or are related to (a) your use or
          misuse of the Site, Content or NFTs, (b) your breach of these Terms, and (c) your breach or violation of the
          rights of a third party, including another user or third party service provider. You agree to promptly notify
          bandit.network of any third party Claims and cooperate with the bandit.network Parties in defending such
          Claims. You further agree that the bandit.network Parties shall have control of the defense or settlement of
          any third party Claims.
        </p>
        <p>
          <b>
            THIS INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES THAT MAY BE SET FORTH IN A
            WRITTEN AGREEMENT BETWEEN YOU AND bandit.network.
          </b>
        </p>
      </div>
    ),
  },
  {
    title: 'Amendment and Variation',
    scrollId: '19',
    renderContent: () => (
      <p>
        These Terms may from time to time be updated or amended. We will post any such updates on the Site. Such updated
        Terms as posted will take effect immediately unless otherwise indicated. You should regularly check the Site to
        inform yourself of any such changes. In addition, we may at any time change, add or remove any feature or
        functionality of the Site without prior notice. By continuing to use the bandit.network Platform and/or the Site
        after any such changes have taken effect, you are indicating your acceptance of the updated or amended Terms as
        well as your acceptance of the updated Site. If you do not wish to be bound by any changes or amendments to
        these Terms then you should stop using the bandit.network Platform and Site immediately.
      </p>
    ),
  },
  {
    title: 'Transfer, Assignment or Delegation',
    scrollId: '20',
    renderContent: () => (
      <p>
        Unless otherwise stated herein, these Terms, and any rights and obligations and licences granted hereunder, are
        limited, revocable, non-exclusive and personal to you and therefore may not be transferred, assigned or
        delegated by you to any third-party without our written consent, but may be transferred, assigned or delegated
        by us without notice and restriction, including without limitation to any of the entities within the
        bandit.network group, or to any successor in interest of any business associated with the bandit.network
        Platform. Any attempted transfer or assignment in violation hereof shall be null and void.
      </p>
    ),
  },
  {
    title: 'Severability',
    scrollId: '21',
    renderContent: () => (
      <p>
        If any provision of these Terms shall be found by any court or administrative body of competent jurisdiction to
        be invalid or unenforceable, the invalidity or unenforceability of such provision shall not affect the other
        provisions of these Terms and all provisions not affected by such invalidity or unenforceability shall remain in
        full force and effect. Such provision will be changed and interpreted to accomplish the objectives of the
        provision to the greatest extent possible under any Applicable Laws.
      </p>
    ),
  },
  {
    title: 'Entire Agreement / Translation',
    scrollId: '22',
    renderContent: () => (
      <div>
        <p>
          These Terms constitute the entire agreement between the parties regarding its subject matter and supersedes
          and invalidates all other prior representations, arrangements, understandings, and agreements relating to the
          same subject matter, (whether oral or in writing, express or implied). Each party acknowledges that in
          agreeing to these Terms it does not rely on any statement, representation, warranty, or understanding other
          than those expressly set out in these Terms.
        </p>
        <p>
          These Terms are concluded in the English language and all communications including any notices or information
          being transmitted shall be in English. In the event that these Terms or any part of it is translated (for any
          proceedings, for your convenience or otherwise) into any other language, the English language text of these
          Terms shall prevail.
        </p>
      </div>
    ),
  },
  {
    title: 'Waiver',
    scrollId: '23',
    renderContent: () => (
      <div>
        <p>These Terms shall not be waived in whole or in part except where agreed by the parties in writing.</p>
        <p>
          The delay of enforcement or the non-enforcement of any of the terms of these Terms by any party shall not be
          construed as a waiver of any of the other rights of that party arising out of the breach or any subsequent
          breach of any of these Terms and no right, power or remedy conferred upon or reserved for any party in these
          Terms is exclusive of any other right, power or remedy available to that party and each such right, power or
          remedy shall be cumulative.
        </p>
      </div>
    ),
  },
  {
    title: 'Notices and Communications',
    scrollId: '24',
    renderContent: () => (
      <div>
        <p>
          By using the bandit.network Platform, you agree that we may provide you with notices or other communications,
          including marketing, relating to your use of the bandit.network Platform electronically: (a) via email (in
          each case to the address that you provide), SMS message, or telephone call (in each case to the phone number
          that you provide), or (b) by posting to the Site. For notices made by email, the date of receipt will be
          deemed the date on which such notice is transmitted. You will always be given the option to unsubscribe from
          receiving any marketing material from us.
        </p>
        <p>
          Notices to us should be sent electronically to{' '}
          <a href="mailto:legal@bandit.network" style={{ color: 'black' }}>
            <b>legal@bandit.network</b>
          </a>
        </p>
      </div>
    ),
  },
  {
    title: 'Third Party Rights',
    scrollId: '25',
    renderContent: () => (
      <div>
        <p>
          Other than the entities within the bandit.network group, a person who is not a party to these Terms has no
          right to enforce any of these Terms.
        </p>
      </div>
    ),
  },
  {
    title: 'Governing Law and Jurisdiction',
    scrollId: '26',
    renderContent: () => (
      <div>
        <p>
          These Terms are governed by and shall be construed in accordance with the laws of Singapore without regard to
          any choice or conflict of laws rules. Any dispute, controversy or claim, whether contractual or
          non-contractual, arising out of or in connection with these Terms, or the breach, termination or invalidity
          thereof, or any other issue which shall arise in virtue of these Terms, shall be referred to and finally
          settled by arbitration administered by the Singapore International Arbitration Centre (<b>"SIAC"</b>) under
          the SIAC Administered Arbitration Rules in force when the Notice of Arbitration is submitted. The law of this
          arbitration clause shall be Singapore law. The seat of arbitration shall be in Singapore. The number of
          arbitrators shall be one. The arbitration proceedings shall be conducted in the English language.
        </p>
      </div>
    ),
  },
]

export default Terms
