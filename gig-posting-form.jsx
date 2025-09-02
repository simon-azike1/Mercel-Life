import React, { useState } from "react";

function ParagraphIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4v16M17 4v16M19 4H9a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h3" />
    </svg>
  );
}

function SkillTag({ skill, onRemove }) {
  return (
    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-red-500 font-bold"
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
}

export default function GigForm() {
  const [gigData, setGigData] = useState({
    title: "",
    budget: "",
    description: "",
    deliveryTime: "",
    revisions: "",
    skills: [],
  });

  const handleChange = (field, value) => {
    setGigData({ ...gigData, [field]: value });
  };

  const handleAddSkill = (skill) => {
    if (skill && !gigData.skills.includes(skill)) {
      setGigData({ ...gigData, skills: [...gigData.skills, skill] });
    }
  };

  const handleRemoveSkill = (skill) => {
    setGigData({
      ...gigData,
      skills: gigData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gig submitted:", gigData);
    alert("Gig submitted! Check console for data.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto space-y-4 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ParagraphIcon className="w-6 h-6" />
        Create a New Gig
      </h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={gigData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter gig title"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Budget ($)</label>
        <input
          type="number"
          value={gigData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your budget"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={gigData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Describe your gig"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Delivery Time (days)</label>
        <input
          type="number"
          value={gigData.deliveryTime}
          onChange={(e) => handleChange("deliveryTime", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter delivery time"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Revisions</label>
        <input
          type="number"
          value={gigData.revisions}
          onChange={(e) => handleChange("revisions", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter number of revisions"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Skills</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {gigData.skills.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill}
              onRemove={() => handleRemoveSkill(skill)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill(e.target.value.trim());
              e.target.value = "";
            }
          }}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Submit Gig
      </button>
    </form>
  );
}
