const Chart = require('../models/chart');

exports.barChart = async (req, res) => {
    try {
        const data = await Chart.find({ type: 'bar' });
        return res.json(data);
    } catch (err) {
        console.error('Error fetching bar chart:', err);
        return res.status(500).json({ error: 'Failed to load bar chart data' });
    }
};

exports.pieChart = async (req, res) => {
    try {
        const data = await Chart.find({ type: 'pie' });
        return res.json(data);
    } catch (err) {
        console.error('Error fetching pie chart:', err);
        return res.status(500).json({ error: 'Failed to load pie chart data' });
    }
};
exports.initData = async (req, res) => {
    try {
        await Chart.deleteMany({});

        const pieData = [
            {
                type: 'pie',
                label: 'Innovation Activity by Sector',
                labels: ['Solar', 'Wind', 'Hydro', 'Battery', 'Hydrogen'],
                data: [95, 85, 50, 90, 75],
                backgroundColor: ['orange', 'lightblue', 'lightgreen', 'gold', 'violet'],
                borderColor: '#fff',
                borderWidth: 2
            },
            {
                type: 'pie',
                label: 'Startup Emergence by Sector',
                labels: ['Solar', 'Wind', 'Hydro', 'Battery', 'Hydrogen'],
                data: [70, 65, 40, 95, 85],
                backgroundColor: ['orange', 'lightblue', 'lightgreen', 'gold', 'violet'],
                borderColor: '#fff',
                borderWidth: 2
            }
        ];

        const barData = [
            {
                type: 'bar',
                label: 'Solar',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [10, 20, 25, 30, 40, 50],
                backgroundColor: 'orange'
            },
            {
                type: 'bar',
                label: 'Wind',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [15, 25, 20, 35, 45, 60],
                backgroundColor: 'lightblue'
            },
            {
                type: 'bar',
                label: 'Hydro',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [5, 10, 12, 20, 30, 40],
                backgroundColor: 'lightgreen'
            },
            {
                type: 'bar',
                label: 'Battery',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [18, 22, 30, 45, 60, 70],
                backgroundColor: 'gold'
            },
            {
                type: 'bar',
                label: 'Hydrogen',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [8, 14, 18, 28, 38, 55],
                backgroundColor: 'violet'
            }
        ];

        await Chart.insertMany([...pieData, ...barData]);

        return res.json({ msg: 'Data added successfully' });
    } catch (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to add data' });
    }
};