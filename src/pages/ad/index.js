import { useState, useEffect } from 'react';

import { Table, Tag, Space } from 'antd';
import { Resizable } from 'react-resizable';

import './index.scss';

const defaultColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address'
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (tags) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		)
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<Space size="middle">
				<a>
					Invite
					{' '}
					{record.name}
				</a>
				<a>Delete</a>
			</Space>
		)
	}
];

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer']
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser']
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher']
	}
];

const App = () => {
	const [dcolumns, setDcolumns] = useState([]);
	const [components, setComponents] = useState({});

	const ResizeableTitle = (props) => {
		// eslint-disable-next-line react/prop-types
		const { onResize, width = 100, ...restProps } = props;
		if (!width) {
			return <th {...restProps} />;
		}

		return (
			<Resizable width={width} height={0} onResize={onResize}>
				<th {...restProps} />
			</Resizable>
		);
	};

	useEffect(() => {
		setDcolumns(defaultColumns);
		setComponents({
			header: {
				cell: ResizeableTitle
			}
		});
	}, []);

	const handleResize = (index) => (e, { size }) => {
		console.log('size', size);

		// eslint-disable-next-line no-use-before-define
		const nextColumns = [...columns];
		nextColumns[index] = {
			...nextColumns[index],
			width: size.width
		};
		setDcolumns(nextColumns);
	};

	const columns = dcolumns.map((col, index) => ({
		...col,
		onHeaderCell: (column) => ({
			width: col.width || 100, // 100 没有设置宽度可以在此写死 例如100试下
			onResize: handleResize(index)
		})
	}));

	return (
		<div className="container">
			<Table
				components={components}
				columns={columns}
				dataSource={data}
			/>
		</div>
	);
};

export default App;
