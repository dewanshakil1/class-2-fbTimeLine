// get element
const addModal = document.getElementById('add-modal');
const msg = document.querySelector('.msg');
const allPostinner = document.querySelector('.all-post');

// get app post
const all_post = () => {
	let post = readLSData('fbPost');
	let list = '';
	if (!post) {
		allPostinner.innerHTML = `<div class="card w-100 shadow-lg text-center"><div class="card-body">No post found</div></div>`;
		return false;
	}
	post.map((data) => {
		list += `
		<div class="post-line-aria my-4">
							<div class="card">
								<div class="card-body">
									<div class="post-auth-ariea">
										<div class="user-info">
											<img src="${data.aphoto}" alt="" />
											<div class="details">
												<span>${data.aname}</span>
												<span
													>2 h .<i class="fa-solid fa-earth-europe"></i
												></span>
											</div>
										</div>
										<div class="dropdown">
											<button
												class="dropdown-toggle"
												type="button"
												data-bs-toggle="dropdown"
											>
												<i class="fa-solid fa-ellipsis"></i>
											</button>
											<ul
												class="dropdown-menu"
												aria-labelledby="dropdownMenuButton1"
											>
												<li><a class="dropdown-item" href="#">Edit</a></li>
												<li>
													<a class="dropdown-item" href="#">Delete</a>
												</li>
											</ul>
										</div>
									</div>
									<div class="post-content-aria">
										<span
											>${data.postcontect}</span
										>
									</div>
								</div>
								${data.pphoto ? `<img src="${data.pphoto}" alt="" />` : ''}
							</div>
						</div>
		`;
	});
	allPostinner.innerHTML = list;
};
all_post();

// submit
addModal.onsubmit = (e) => {
	e.preventDefault();
	let loading = document.querySelector('.loading');
	loading.style.display = 'block';
	let timeout = setTimeout(() => {
		// loading hide
		loading.style.display = 'none';
		// form data get
		const from_data = new FormData(e.target);
		const data = Object.fromEntries(from_data.entries());
		const { aname, aphoto, postcontect } = Object.fromEntries(
			from_data.entries()
		);
		//validation
		if (!aname || !aphoto || !postcontect) {
			msg.innerHTML = setAlert('All field are required');
		} else {
			msg.innerHTML = setAlert('data is success', 'success');
			createLSData('fbPost', data);
			e.target.reset();
			all_post();
		}
		clearTimeout(timeout);
	}, 2000);
};
// // close-modal
// let closeModal = document.querySelector('.close-modal');
// let modalBodyClose = document.querySelector('.modal-body-close');
// closeModal.onclick = () => {
// 	modalBodyClose.style.display = 'none';
// };
