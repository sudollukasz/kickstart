import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributrForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address
    };
  }

  renderCards() {
    const { balance, manager, minimumContribution, requestCount, approversCount } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Managers address',
        description: 'Manager created this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution [wei]',
        description: 'You must contribute at least this much of wei'
      },
      {
        header: requestCount,
        meta: 'Number of requests',
        description: 'Requests withdraw money from the cntract to pointed address'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of poeple who have donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance [ETH]',
        description: 'This is amout of money avaliable in this campaign'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributrForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
              <Grid.Column>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default CampaignShow;
