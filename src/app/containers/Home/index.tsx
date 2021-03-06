import Feed from 'components/Feed';
import { fetchFeed } from 'core/actions';
import { IFeedRecord } from 'core/models';
import { RootState } from 'core/reducers';
import { classNames } from 'core/styles';
import * as React from 'react';
import { connect } from 'react-redux';

const styles = require('./index.scss');
const cn = classNames(styles);

const mapStateToProps = (state: RootState, props: Props): Props => {
    if (state.courses == null || state.user == null) {
        return props;
    }
    return {
        ...props,
        feed: state.user.feed || [],
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Props => {
    return {
        ...props,

        fetchFeed: () => {
            dispatch(fetchFeed());
        },
    };
};

type Props = {
    feed: IFeedRecord[];
    fetchFeed: () => void;
};

class Home extends React.Component<Props, any> {
    componentDidMount() {
        this.props.fetchFeed();
    }

    render() {
        return (
            <div className={cn('home-container')}>
                <Feed feedData={this.props.feed} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
