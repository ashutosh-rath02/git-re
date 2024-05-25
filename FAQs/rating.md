### Rating Categories and Weights

1. **Stars (Weight: 25%)**
2. **Number of Repositories (Weight: 15%)**
3. **Followers (Weight: 20%)**
4. **Organizations (Weight: 10%)**
5. **Contributions to High-Standard Repositories (Weight: 30%)**

## Point System

### Stars

- **0-10 stars:** 1 point
- **11-50 stars:** 2 points
- **51-200 stars:** 3 points
- **201-500 stars:** 4 points
- **501+ stars:** 5 points

### Number of Repositories

- **0-5 repos:** 1 point
- **6-20 repos:** 2 points
- **21-50 repos:** 3 points
- **51-100 repos:** 4 points
- **101+ repos:** 5 points

### Followers

- **0-10 followers:** 1 point
- **11-50 followers:** 2 points
- **51-100 followers:** 3 points
- **101-500 followers:** 4 points
- **501+ followers:** 5 points

### Organizations

- **Not part of any org:** 1 point
- **Member of 1 org:** 2 points
- **Member of 2-3 orgs:** 3 points
- **Member of 4-5 orgs:** 4 points
- **Member of 6+ orgs:** 5 points

### Contributions to High-Standard Repositories

- **No contributions:** 1 point
- **1-5 contributions:** 2 points
- **6-20 contributions:** 3 points
- **21-50 contributions:** 4 points
- **51+ contributions:** 5 points

### Rating Calculation Formula

To calculate the overall rating, we use the weighted sum of the scores from each category and then normalize it to a 5-point scale.

$$
\text{Rating} = \left( \frac{\sum (\text{category points} \times \text{category weight})}{\text{max possible score}} \right) \times 5
$$

### Example Calculation

Assume a user has:

- 300 stars
- 30 repositories
- 100 followers
- Member of 3 organizations
- 15 contributions to high-standard repositories

**Stars:** 300 stars → 4 points

**Repositories:** 30 repos → 3 points

**Followers:** 100 followers → 3 points

**Organizations:** 3 orgs → 3 points

**Contributions:** 15 contributions → 3 points

Weighted scores:

- Stars: 4 points \* 0.25 = 1.00
- Repos: 3 points \* 0.15 = 0.45
- Followers: 3 points \* 0.20 = 0.60
- Organizations: 3 points \* 0.10 = 0.30
- Contributions: 3 points \* 0.30 = 0.90

Total weighted score = 1.00 + 0.45 + 0.60 + 0.30 + 0.90 = 3.25

Normalized rating (out of 5) = (3.25 / 5) \* 5 = 3.25

Thus, the user's rating is **3.25 out of 5**.
