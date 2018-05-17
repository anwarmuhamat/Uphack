import React from 'react'
import makeRPC from '../utils/rpcUtils'
import encoding from '../utils/encoding'

class Upvote extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    upvote = () => {
        const secret = encoding.hex2ab(localStorage.getItem('hashnewsKey'));
        const publicKey = nacl.util.encodeBase64(nacl.sign.keyPair.fromSecretKey(secret).publicKey);      

        let txBody = { 
            type: "upvotePost",
            entity: {
                stamp: new Date().getTime(),
                postId: this.props.post._id,
                upvoter: this.props.user._id
            }
        }

        makeRPC(txBody, publicKey, secret);

        this.props.upvoteCallback(this.props.post._id, !this.props.post.upvotedByCurrentUser);
    }

    render() {
        return (
            <button className={"upvote-btn " + (this.props.post.upvotedByCurrentUser ? 'active' : '')} onClick={this.upvote}><i className="mdi-arrow-outline-up"></i></button>
        )
    }
}

export default Upvote