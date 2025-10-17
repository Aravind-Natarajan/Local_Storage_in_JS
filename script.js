let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

      function save() {
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
      }

      function render(list = feedbacks) {
        const tbody = document.querySelector("#table tbody");
        tbody.innerHTML = "";
        list.forEach((fb, i) => {
          tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td class="text-capitalize">${fb.name}</td>
          <td>${fb.comment
            .map((c, idx) => `<div>${idx + 1}. ${c}</div>`)
            .join("")}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1" onclick="editFeedback(${i})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteFeedback(${i})">Delete</button>
          </td>
        </tr>`;
        });
      }

      function addFeedback(name, comment) {
        const student = feedbacks.find((f) => f.name === name);
        if (student) {
          student.comment.push(comment);
        } else {
          feedbacks.push({ name, comment: [comment] });
        }
        save();
        render();
      }

      function editFeedback(index) {
        document.getElementById("editIndex").value = index;
        document.getElementById("name").value = feedbacks[index].name;
        document.getElementById("comment").value = feedbacks[index].comment[0];
        document.getElementById("name").focus();
      }

      function updateFeedback(index, newComment) {
        feedbacks[index].comment[0] = newComment;
        save();
        render();
      }

      function deleteFeedback(index) {
        if (confirm("Delete this feedback?")) {
          feedbacks.splice(index, 1);
          save();
          render();
        }
      }

      document.getElementById("clearAll").onclick = () => {
        if (confirm("Delete all feedbacks?")) {
          feedbacks = [];
          save();
          render();
        }
      };

      document.getElementById("form").onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim().toLowerCase();
        const comment = document.getElementById("comment").value.trim();
        const idx = document.getElementById("editIndex").value;

        if (idx) {
          updateFeedback(idx, comment);
          document.getElementById("editIndex").value = "";
        } else {
          addFeedback(name, comment);
        }
        e.target.reset();
      };

      //search
      document.getElementById("searchBox").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = feedbacks.filter((f) =>
          f.name.toLowerCase().includes(query)
        );
        render(filtered);
      });

      render();