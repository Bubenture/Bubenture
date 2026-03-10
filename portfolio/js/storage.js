export const projects = [];

async function fetchGithubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/Bubenture/repos?per_page=100&sort=updated');
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    
    projects.length = 0;
    repos.forEach(repo => {
      if (repo.name !== 'Bubenture') {
        projects.push(repo.name);
      }
    });
    
    console.log('GitHub проекты:', projects.length);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    projects.push(
      'Bubenture'
    );
  }
}

const projectsProxy = new Proxy(projects, {
  get(target, prop) {
    if (prop === 'length' || prop === 'slice' || prop === 'forEach' || !isNaN(prop)) {
      if (target.length === 0 && !window._githubProjectsLoaded) {
        console.log('Ожидание загрузки');
      }
    }
    return target[prop];
  }
});

window._githubProjectsLoaded = false;

fetchGithubRepos().then(() => {
  window._githubProjectsLoaded = true;
  if (window.toggleSlider) {
    window.toggleSlider();
  }
});

export default projectsProxy;