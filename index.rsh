'reach 0.1';

export const main = Reach.App(() => {
    const Blogger = Participant('Blogger', {
        createPost: Fun([], Bytes(160)),
        createStream: Fun([], Bytes(32))
    });

    const Subscriber = ParticipantClass('Subscriber', {
        subscribe: Fun([Bytes(32)], Null),
        readPost: Fun([Address, Bytes(160)], Null)
    })
    init();

    Blogger.only(() => {
        const author = this;
        const streamName = declassify(interact.createStream()); 
    });
    Blogger.publish(author, streamName); 
    commit();

    Subscriber.only(() => {
        const subscription = declassify(interact.subscribe(streamName)); 
    });
    Subscriber.publish(subscription);
    commit();

    Blogger.only(() => {
        const post = declassify(interact.createPost());
    });
    Blogger.publish(post);
    commit();

    Subscriber.only(() => {
        interact.readPost(author, post);
    });
    commit();
    exit();
});
