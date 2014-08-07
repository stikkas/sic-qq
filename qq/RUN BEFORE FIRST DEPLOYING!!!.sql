 create view V_DESC_ATTR_VALUE as (
 SELECT dva.descriptor_value_attr_id, dva.descriptor_value_id, dga.attr_code, dga.is_collection, COALESCE(dva.attr_value, dv.value_code) AS attr_value
   FROM descriptor_value_attr dva
   JOIN descriptor_group_attr dga ON dva.descriptor_group_attr_id = dga.descriptor_group_attr_id
   LEFT JOIN descriptor_value dv ON dva.ref_descriptor_value_id = dv.descriptor_value_id
);