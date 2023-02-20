/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import useInterval from '@use-it/interval';

// Constants
const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const STREAM_MUTATION_ODDS = 0.02;

const MIN_STREAM_SIZE = 10;
const MAX_STREAM_SIZE = 60;

const MIN_INTERVAL_DELAY = 5;
const MAX_INTERVAL_DELAY = 10;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 100;

const getRandInRange = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
	VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
	new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
		.fill()
		.map(_ => getRandChar());

const getMutatedStream = stream => {
	const newStream = [];
	for (let i = 1; i < stream.length; i++) {
		if (Math.random() < STREAM_MUTATION_ODDS) {
			newStream.push(getRandChar());
		} else {
			newStream.push(stream[i]);
		}
	}
	newStream.push(getRandChar());
	return newStream;
};

const RainStream = props => {
	const [stream, setStream] = useState(getRandStream());
	const [topPadding, setTopPadding] = useState(stream.length * -5);
	const [intervalDelay, setIntervalDelay] = useState(null);

	// Initialize intervalDelay
	useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);

	useInterval(() => {
		if (!props.height) return;

		if (!intervalDelay) return;

		// If stream is off the screen, reset it after timeout
		if (topPadding > props.height) {
			setStream([]);
			const newStream = getRandStream();
			setStream(newStream);
			setTopPadding(newStream.length * -60);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
				getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
		} else {
			setTopPadding(topPadding + 10);
		}
		// setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
		setStream(getMutatedStream);
	}, intervalDelay);

	return (
		<div
			style={{
				color: '#88ccca',
				writingMode: 'vertical-rl',
				textOrientation: 'upright',
				userSelect: 'none',
				whiteSpace: 'nowrap',
				marginTop: topPadding,
				marginLeft: 8,
				marginRight: 8,
				textShadow: '0px 0px 1px rgba(32, 194, 14, 0.2)',
				fontSize: 18,
			}}>
			{stream.map((char, index) => (
				<a
					style={{
						marginTop: 2,
						// Reduce opacity for last chars
						opacity: index < 6 ? 0.05 + index * 0.02 : 0.02,
						color: index === stream.length - 1 ? '#88ccca' : undefined,
						textShadow:
							index === stream.length - 1
								? '0px 0px 1px rgba(255, 255, 255, 0.2)'
								: undefined,
					}}>
					{char}
				</a>
			))}
		</div>
	);
};

const MatrixRain = () => {
	const containerRef = useRef(null);
	const [containerSize, setContainerSize] = useState(null); // ?{width, height}

	useEffect(() => {
		const boundingClientRect = containerRef.current.getBoundingClientRect();
		setContainerSize({
			width: boundingClientRect.width,
			height: boundingClientRect.height,
		});
	}, []);

	const streamCount = containerSize ? Math.floor(containerSize.width / 80) : 0;

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}}
			ref={containerRef}>
			{Array(streamCount).fill().map(_ => (
				<RainStream height={containerSize?.height} />
			))}
		</div>
	);
};

export default MatrixRain;